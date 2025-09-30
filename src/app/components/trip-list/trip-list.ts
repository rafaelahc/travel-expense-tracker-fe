import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router, Routes } from '@angular/router';


//criar a interface, ou seja, informar quais propriedades as viagens devem ter:
interface Trip {
  id: number;
  destination: string;
  startDate: string;
  endDate: string;
  qtyPeople: number;
}

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-list.html',
  styleUrl: './trip-list.scss'
})


export class TripList {
  //montar um array de objetos
  trips: Trip[] = [
    {
      id: 1,
      destination: 'Edinburgh',
      startDate: '2024-05-29',
      endDate: '2024-06-02',
      qtyPeople: 2
    },
    {
      id: 2,
      destination: 'Paris',
      startDate: '2023-10-04',
      endDate: '2023-10-07',
      qtyPeople: 3
    }

  ]

  constructor(private router: Router) {}

  qtyTripPeople = '';

  showQtyPeople(trip: Trip) {
    this.qtyTripPeople = `Nesta viagem foi feita por ${trip.qtyPeople} pessoas`;
  }

  showTripDetails(id: number) {
    this.router.navigate(['/trip-details', id]);
  }


}
