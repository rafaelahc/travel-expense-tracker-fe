import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';


//Directive
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = ('travel-expense-tracker-frontend');
}
