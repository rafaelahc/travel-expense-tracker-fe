import { inject, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

import { AuthResponseData } from '../models/authResponseData.model';
import { BehaviorSubject, catchError, Observable, switchMap, tap, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private http = inject(HttpClient);
  private router = inject(Router);
  private tokenExpirationTimer: any;

  //APIS
  firebaseSignUpApi = environment.apis.firebase.firebaseSignUp;
  firebaseLoginApi = environment.apis.firebase.firebaseLogin;
  firebaseUpdateProfile = environment.apis.firebase.firebaseUpdateProfile;
  firebaseGetUserData = environment.apis.firebase.firebaseGetUserData;
  firebaseApiKey = environment.apiKeys.firebase;

  //User model - storage user data
  currentUser = new BehaviorSubject<User | null>(null);


  signUp(name: string, email: string, password: string) {
    return this.http.post<AuthResponseData>(`${this.firebaseSignUpApi}?key=${this.firebaseApiKey}`,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
      .pipe(
        catchError(this.handleAuthError),
        tap((resData: AuthResponseData) => {
          this.handleUserAuthentication(resData.localId, resData.email, resData.idToken, +resData.expiresIn, name);
        })
      )

  }


  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(`${this.firebaseLoginApi}?key=${this.firebaseApiKey}`,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }

    ).pipe(
      catchError(this.handleAuthError),
      tap((resData: AuthResponseData) => {
        this.handleUserAuthentication(resData.localId, resData.email, resData.idToken, +resData.expiresIn, '');
      })
    )
  }

  //Pegar os dados enviados para o navegador e restaurar
  autoLogin() {
    //retorna apenas um texto JSON, ainda não é um objeto.
    const userData: {
      id: string,
      email: string,
      _token: string,
      _tokenExpirationDate: string,
      displayName?: string
    } = JSON.parse(localStorage.getItem('userData')!);

    if (!userData) {
      return;
    }

    //Carregar os dados;
    //preciso criar um novo objeto para mostrar os dados
    const loadedUser = new User(
      userData.id,
      userData.email,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    //validar se o token ainda está válido:
    if (loadedUser.token) {
      this.currentUser.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.currentUser.next(null);
    this.router.navigate(['/login'])
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  handleUserAuthentication(userId: string, email: string, token: string, expiresIn: number, name: string) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    //crio o user
    const user = new User(userId, email, token, expirationDate, name)
    this.currentUser.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));

  }

  handleAuthError(resError: any) {
    console.log('Firebase error response:', resError);
    let errorMessage = "An error occurred!"

    if (!resError.error || !resError.error.error) {
      return throwError(() => new Error(errorMessage));;
    }
    switch (resError.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = "There's already an account with this email!";
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Password sign-in is disabled for this project!';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'Too many attempts. Please, try again later.';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'Invalid login credentials.';
        break;
    }

    return throwError(() => new Error(errorMessage))
  }

}

