import { computed, inject, Injectable, signal } from '@angular/core';

import { type Expense } from '../models/expense.model'
import { environment } from '../environments/environment';
import { map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ExpenseService {
  private http = inject(HttpClient);
  private firebaseDataBase = environment.apis.firebase.firebaseTETDataBase;

  //transformar o meu array em signal:
  expenses = signal<Expense[]>([]);

  totalGeneral = computed(() => this.expenses().reduce((sum, exp) => sum + (exp.value || 0), 0));

  totalByCategory = (categoryId: string) => computed(() =>
    this.expenses().filter(exp => exp.categoryId === categoryId).reduce((sum, exp) => sum + exp.value, 0)
  )

  //Retornar a lista de despesas que eu tenho no firebase e setar no meu array:
  loadExpenses(userId: string, tripId: string) {
    return this.http.get<any>(`${this.firebaseDataBase}/users/${userId}/trips/${tripId}/expense.json`)
      .pipe(
        map(res => res ? Object.keys(res).map(id => ({ id, ...res[id] })) : []),
        tap(list => this.expenses.set(list))
      );
  }


  addExpense(userId: string, newExpense: Expense): Observable<any> {
    return this.http.post(`${this.firebaseDataBase}/users/${userId}/trips/${newExpense.tripId}/expense.json`,{
      // ...newExpense
      tripId: newExpense.tripId,
      categoryId: newExpense.categoryId,
      description: newExpense.description,
      value: newExpense.value
    })
  }


  deleteExpense(userId: string, tripId: string, expenseId: string) {
    return this.http.delete<void>(`${this.firebaseDataBase}/users/${userId}/trips/${tripId}/expense/${expenseId}.json`)
  }




  /* CODIGO ANTIGO ABAIXO: */

  // //Array vazio onde eu vou receber as despesas que o usuário cadastrou no formulário.
  // private expenses: Expense[] = [];

  // //enviar os dados para o firebase
  // addExpense(userId: string, newExpense: Expense): Observable<any> {
  //   return this.http.post(`${this.firebaseDataBase}/users/${userId}/trips/${newExpense.tripId}/expense.json`, {
  //     tripId: newExpense.tripId,
  //     categoryId: newExpense.categoryId,
  //     description: newExpense.description,
  //     value: newExpense.value
  //   })
  // }

  // getExpensesFromFirebase(userId: string, tripId: string): Observable<Expense[]> {
  //   return this.http.get<Expense[]>(`${this.firebaseDataBase}/users/${userId}/trips/${tripId}/expense.json`);
  // }


  // //Método que eu recebo os dados do firebase, passados pelo meu expenseList
  // setExpenses(expenses: Expense[]) {
  //   return this.expenses = expenses;
  // }

  // getExpenses() {
  //   return this.expenses;
  // }

  // // Retorna apenas os gastos de uma viagem específica.
  // getExpensesByTrip(tripId: string): Expense[] {
  //   return this.expenses.filter(e => e.tripId === tripId);
  // }

  // deleteExpense(userId: string, tripId: string, expenseId: string) {
  //   return this.http.delete<void>(`${this.firebaseDataBase}/users/${userId}/trips/${tripId}/expense/${expenseId}.json`)
  // }

  // /* Função para somar o total de todos os gastos */
  // getTotalExpenses(): number {
  //   return this.expenses.reduce((sum, exp) => sum + exp.value, 0);
  // }







} 
