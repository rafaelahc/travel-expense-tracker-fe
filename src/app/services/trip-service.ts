import { inject, Injectable } from '@angular/core';

/* Models */
import { type Trip } from '../models/trip.model'
import { type Expense } from '../models/expense.model';


import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TripService {

  //Array vazio onde eu vou receber as viagens que o usuário cadastrou no formulário.
  private trips: Trip[] = [];
  private http = inject(HttpClient);
  private router = inject(Router);

  //FireBase database
  firebaseDataBase = environment.apis.firebase.firebaseTETDataBase;

  /* Como o array está private, eu preciso liberar ele para outros componentes acessarem: */
  //Crio um método do tipo Trip, ou seja, com os dados do meu model.
  getTrips(): Trip[] {
    return this.trips;
  }

  //Função para receber os dados do usuário.
  addTrip(userId: string, newTrip: Trip, token: string): Observable<any> {
    //vou colocar no meu array de viagens, o que vier dentro do método addTrip.
    return this.http.post(`${this.firebaseDataBase}/users/${userId}/trips.json?auth=${token}`, {
      destination: newTrip.destination,
      startDate: newTrip.startdate,
      endDate: newTrip.enddate,
      days: newTrip.days,
      peopleQty: newTrip.peopleQty,
      selectedImage: newTrip.selectedImage
    })
  };

  getTripsFromFirebase(userId: string, token: string): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.firebaseDataBase}/users/${userId}/trips.json?auth=${token}`);
  }

  getTripById(userId: string, tripId: string, token: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.firebaseDataBase}/users/${userId}/trips/${tripId}.json?auth=${token}`);
  }

  deleteTrip(userId: string, tripId: string): Observable<void> {
    return this.http.delete<void>(`${this.firebaseDataBase}/users/${userId}/trips/${tripId}.json`)
  }

}
