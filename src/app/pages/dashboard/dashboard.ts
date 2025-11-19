import { Component, inject, OnDestroy, OnInit } from '@angular/core';

//Component
import { TripList } from "../../components/trip-list/trip-list";
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
import { Button } from "../../shared/button/button";
import { Auth } from '../../services/auth-service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  imports: [TripList, RouterModule, Button],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})


export class Dashboard implements OnInit, OnDestroy {
  authService = inject(Auth);
  userName: string = '';
  userEmail: string = '';

  userId!: string;
  userToken!: string;

  private route = inject(ActivatedRoute);

  private userSub: Subscription | null = null;;
  isAuthenticated = false;


  ngOnInit() {
    this.userSub = this.authService.currentUser.subscribe(user => {
      this.isAuthenticated = !user ? false : true;

      if (user) {
        this.userId = user.id;
      }
    })
  }

  onLogout() {
    this.authService.logout();
    console.log('logout feito')
  }

  ngOnDestroy() {
    this.userSub?.unsubscribe();
  }

}
