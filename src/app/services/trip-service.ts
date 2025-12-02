import { inject, Injectable, signal } from '@angular/core';

/* Models */
import { type Trip } from '../models/trip.model'
import { type Expense } from '../models/expense.model';


import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TripService {

  //Array vazio onde eu vou receber as viagens que o usuário cadastrou no formulário

  private http = inject(HttpClient);

  //FireBase database
  firebaseDataBase = environment.apis.firebase.firebaseTETDataBase;

  // private trips: Trip[] = [];

  trips = signal<Trip[]>([]);


  //Verificar se tem algo no meu firebase
  loadedTrips(userId: string, token: string): Observable<any> {
    return this.http.get<{ [key: string]: Trip } | null>(`${this.firebaseDataBase}/users/${userId}/trips.json?auth=${token}`)
      .pipe(
        map(res => res ? Object.keys(res).map(key => ({ ...res[key], id: key })) : []),
        tap(list => this.trips.set(list))
      )
  }

  //Obter a viagem pelo id dela
  getTripById(userId: string, tripId: string, token: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.firebaseDataBase}/users/${userId}/trips/${tripId}.json?auth=${token}`);
  }

  //Função para receber os dados do usuário.
  addTrip(userId: string, newTrip: Trip, token: string): Observable<any> {
    //vou colocar no meu array de viagens, o que vier dentro do método addTrip.
    return this.http.post(`${this.firebaseDataBase}/users/${userId}/trips.json?auth=${token}`, {
      ...newTrip
    })
  };

  updateTripImage(userId: string, tripId: string, image: any): Observable<any> {
  return this.http.patch(
    `${this.firebaseDataBase}/users/${userId}/trips/${tripId}.json`,
    { selectedImage: image }
  );
}

  deleteTrip(userId: string, tripId: string): Observable<void> {
    return this.http.delete<void>(`${this.firebaseDataBase}/users/${userId}/trips/${tripId}.json`)
  }


}
