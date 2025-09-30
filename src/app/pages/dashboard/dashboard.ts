import { Component } from '@angular/core';

//Component
import { TripList } from "../../components/trip-list/trip-list";


@Component({
  selector: 'app-dashboard',
  imports: [TripList],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})



export class Dashboard {

}
