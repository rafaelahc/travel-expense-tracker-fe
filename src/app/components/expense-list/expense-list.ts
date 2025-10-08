import { Component } from '@angular/core';

//MODELS
import { Expense } from '../../models/expense.model';
import { ExpenseService } from '../../services/expense-service';

@Component({
  selector: 'app-expense-list',
  imports: [],
  templateUrl: './expense-list.html',
  styleUrl: './expense-list.scss'
})
export class ExpenseList {
  //Crio uma variável que vai receber os dados passado que será a minha lista de gastos
  expenses: Expense[] = [];

  constructor(private expenseService: ExpenseService) { }

  ngOnInit() {
    this.expenses = this.expenseService.getExpenses();
  }
}
