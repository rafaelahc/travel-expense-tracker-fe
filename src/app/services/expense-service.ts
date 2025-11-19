import { inject, Injectable } from '@angular/core';

import { type Expense } from '../models/expense.model'
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ExpenseService {
  private http = inject(HttpClient);
  //firebase
  private firebaseDataBase = environment.apis.firebase.firebaseTETDataBase;
  //Array vazio onde eu vou receber as despesas que o usuário cadastrou no formulário.
  private expenses: Expense[] = [];

  getExpenseByCategoryFromFirebase(userId: string, tripId: string, expenseId: string, categoryId: string): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.firebaseDataBase}/users/${userId}/trips/${tripId}/expense/${expenseId}/${categoryId}.json`);
  }

  //Como o array está private, eu preciso liberar ele para outros componentes acessarem: */
  //Crio um método do tipo Expense, ou seja, com os dados do meu model.
  getExpenses(): Expense[] {
    return this.expenses;
  }

  // Retorna apenas os gastos de uma viagem específica
  getExpensesByTrip(tripId: string): Expense[] {
    return this.expenses.filter(e => e.tripId === tripId);
  }

  //enviar os dados para o firebase
  addExpense(userId: string, newExpense: Expense): Observable<any> {
    return this.http.post(`${this.firebaseDataBase}/users/${userId}/trips/${newExpense.tripId}/expense.json`, {
      tripId: newExpense.tripId,
      categoryId: newExpense.categoryId,
      description: newExpense.description,
      value: newExpense.value
    })
  }

  getExpensesFromFirebase(userId: string, tripId: string): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.firebaseDataBase}/users/${userId}/trips/${tripId}/expense.json`);
  }

  deleteExpense(userId: string, tripId: string, expenseId: string) {
    return this.http.delete<void>(`${this.firebaseDataBase}/users/${userId}/trips/${tripId}/expense/${expenseId}.json`)
  }

  getTotalByCategory(categoryId: string): number {
    return this.expenses.filter(expense => expense.categoryId === categoryId).
      reduce((sum, exp) => sum + exp.value, 0);
  }

  /* Função para somar o total de todos os gastos */
  getTotalExpenses(): number {
    return this.expenses.reduce((sum, exp) => sum + exp.value, 0);
  }

} 
