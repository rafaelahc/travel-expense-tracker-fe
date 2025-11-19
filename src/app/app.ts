import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Auth } from './services/auth-service';


//Directive
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  title = ('travel-expense-tracker-frontend');
  authService = inject(Auth);

  ngOnInit() {
    this.authService.autoLogin();
  }



}
