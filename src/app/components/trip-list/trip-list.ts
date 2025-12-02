import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripService } from '../../services/trip-service';

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

  private tripService = inject(TripService);

  //crio uma variável que vai receber os dados passado que será a minha lista.,
  trips = this.tripService.trips;

  ngOnInit() {
    console.log('user', this.userId);
    console.log('token', this.userToken);

    if (this.userId && this.userToken) {
      this.tripService.loadedTrips(this.userId, this.userToken).subscribe(() => { console.log('Trips', this.trips()); });
    }

  }

  onDeleteTrip(tripId: string) {
    if (!this.userId) return;

    this.tripService.deleteTrip(this.userId, tripId).subscribe(() => {
      this.trips.set(this.trips().filter(t => t.id !== tripId))
    })
  }


}

