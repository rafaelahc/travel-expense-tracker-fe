import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//Models
import { type Trip } from '../../models/trip.model';
import { type Expense } from '../../models/expense.model';

//Services
import { TripService } from '../../services/trip-service';
import { ExpenseList } from "../../components/expense-list/expense-list";
import { ExpenseService } from '../../services/expense-service';


@Component({
  selector: 'app-trip-details',
  imports: [ExpenseList],
  templateUrl: './trip-details.html',
  styleUrl: './trip-details.scss'
})
export class TripDetails {
  //declaro uma propriedade aqui, onde irá receber valores de Trip. Ou tbm pode ser undefined
  trip?: Trip;

  //é como se fosse meu array com todos os gastos
  expenses?: Expense[];

  //Eu preciso ter acesso ao service, então eu faço um constructor. Tanto do service quanto da rota. (URL)
  constructor(private expenseService: ExpenseService, private tripService: TripService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const tripId = this.route.snapshot.paramMap.get('id');
    if (tripId) {
      this.trip = this.tripService.getTrips().find(t => t.id === tripId);
      this.expenses = this.expenseService.getExpenses().filter(exp => exp.tripId === tripId);
      console.log("expenses:", this.expenses);
    }
  }

  openNewExpense() {
    if (this.trip) {
      this.router.navigate(['/expense-form', this.trip.id]);
    }
  }
}