import { Injectable } from '@angular/core';

import { type Expense } from '../models/expense.model'

@Injectable({
  providedIn: 'root'
})


export class ExpenseService {
  //Array vazio onde eu vou receber as despesas que o usuário cadastrou no formulário.
  private expenses: Expense[] = [];
  public expPerCategory: { [category: string]: Expense[] } = {};

  constructor() {
    const expenses = localStorage.getItem('expenses');
    if (expenses) {
      this.expenses = JSON.parse(expenses);
    }

  }

  //Como o array está private, eu preciso liberar ele para outros componentes acessarem: */
  //Crio um método do tipo Expense, ou seja, com os dados do meu model.
  getExpenses(): Expense[] {
    console.log('quantidade que tem no array:', this.expenses.length);
    return this.expenses;
  }

  // Retorna apenas os gastos de uma viagem específica
  getExpensesByTrip(tripId: string): Expense[] {
    return this.expenses.filter(e => e.tripId === tripId);
  }

  /* Função para receber os dados que o usuário colocar no input: */
  addExpense(newExpense: Expense) {
    //o que eu receber que vem no parametro, eu coloco no meu array expenses.
    this.expenses.push(newExpense);
    const catId = newExpense.categoryId;

    if (!this.expPerCategory[catId]) {
      this.expPerCategory[catId] = []; // cria o array se não existir
    }

    this.expPerCategory[catId].push(newExpense);

    this.saveExpenses();
  }

  private saveExpenses() {
    localStorage.setItem('expenses', JSON.stringify(this.expenses));

  }

} 
