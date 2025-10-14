import { Injectable } from '@angular/core';

/* Models */
import { type Trip } from '../models/trip.model'
import { type Expense } from '../models/expense.model';


import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})


export class TripService {

  //Array vazio onde eu vou receber as viagens que o usuário cadastrou no formulário.
  private trips: Trip[] = [
  ];

  constructor() {
    //PEGAR OS DADOS DO LOCAL STORAGE
    const trips = localStorage.getItem('trips');
    if (trips) {
      this.trips = JSON.parse(trips);
    }
  }

  /* Como o array está private, eu preciso liberar ele para outros componentes acessarem: */
  //Crio um método do tipo Trip, ou seja, com os dados do meu model.
  getTrips(): Trip[] {
    return this.trips;
  }

  //Função para receber os dados do usuário.
  addTrip(newTrip: Trip) {
    //vou colocar no meu array de viagens, o que vier dentro do método addTrip.
    this.trips.push(newTrip);

    this.saveTrips();
  };

  //Salvar no local storage.
  private saveTrips() {
    localStorage.setItem('trips', JSON.stringify(this.trips));

  }


}
