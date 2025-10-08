import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TripService } from '../../services/trip-service';
import { Router, RouterModule, Routes } from '@angular/router';
import { Trip } from '../../models/trip.model';

@Component({
  selector: 'app-trip-form',
  imports: [FormsModule, RouterModule],
  templateUrl: './trip-form.html',
  styleUrl: './trip-form.scss'
})
export class TripForm {
  //crio as variáveis que irão receber os valores dos inputs:
  enteredDestination = '';
  enteredStartDate = '';
  enteredEndDate = '';

  //Estou construindo uma variavel/objeto que vai instanciar o trip service
  constructor(private tripService: TripService, private router: Router) { }

  onSubmit() {
    //criar model com base nos valores que p user preencheu  no form  
    const newTrip: Trip = {
      id: Date.now().toString(),
      destination: this.enteredDestination,
      startdate: this.enteredStartDate,
      enddate: this.enteredEndDate
    };

    this.tripService.addTrip(newTrip);

    //Limpar os inputs
    this.enteredDestination = '';
    this.enteredStartDate = '';
    this.enteredEndDate = '';


    this.router.navigate(['/dashboard']);

  }


}
