import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripService } from '../../services/trip-service';

import { type Trip } from '../../models/trip.model';
import { RouterModule} from '@angular/router';


@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './trip-list.html',
  styleUrl: './trip-list.scss'
})


export class TripList {

  //crio uma variável que vai receber os dados passado que será a minha lista.,
  trips: Trip[] = [];

  //Estou construindo uma variavel/objeto que vai instanciar o trip service
  constructor(private tripService: TripService) { }


  ngOnInit() {
    this.trips = this.tripService.getTrips();
  }


}
