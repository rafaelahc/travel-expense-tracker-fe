import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripService } from '../../services/trip-service';

import { type Trip } from '../../models/trip.model';
import { RouterModule } from '@angular/router';

import { Button } from '../../shared/button/button';


@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CommonModule, RouterModule, Button],
  templateUrl: './trip-list.html',
  styleUrl: './trip-list.scss'
})


export class TripList {
  @Input() userId!: string;
  @Input() userToken!: string;



  //crio uma variável que vai receber os dados passado que será a minha lista.,
  trips: Trip[] = [];

  //Estou construindo uma variavel/objeto que vai instanciar o trip service
  constructor(private tripService: TripService) { }


  ngOnInit() {
    console.log('UserId recebido no TripList:', this.userId);

    this.tripService.getTripsFromFirebase(this.userId, this.userToken).subscribe((res: { [key: string]: any }) => {
      if (!res) {
        this.trips = [];
        return;
      }
      this.trips = Object.keys(res).map(key => ({ id: key, ...res[key] }));
    });

  }

  onDeleteTrip(tripId: string) {
    console.log('clicou no botão')
    const userData = JSON.parse(localStorage.getItem('userData')!);
    const userId = userData.id;

    this.tripService.deleteTrip(userId, tripId).subscribe(() => {
      this.trips = this.trips.filter(t => t.id !== userId);
    })

    this.trips = this.trips.filter(t => t.id !== tripId);
  }


}
