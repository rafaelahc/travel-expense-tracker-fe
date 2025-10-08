import { Component } from '@angular/core';

//Component
import { TripList } from "../../components/trip-list/trip-list";
import { RouterModule, Routes } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  imports: [TripList, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})


export class Dashboard {

}
