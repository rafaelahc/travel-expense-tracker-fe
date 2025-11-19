import { inject, Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Auth } from './auth-service';
import { map, Observable, take } from 'rxjs';
// import { take } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private authService = inject(Auth);
  private router = inject(Router);

  canActivate(): boolean | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | UrlTree {
    return this.authService.currentUser
      .pipe(
        take(1),
        map(user => {
          const isAuth = !!user;
          if (isAuth) {
            return true;
          }
          return this.router.createUrlTree(['/login']);
        })
      );
  }
}

