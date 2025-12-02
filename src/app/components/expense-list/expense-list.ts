import { Component, inject, Input, OnInit, signal, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

//MODELS
import { Expense } from '../../models/expense.model';
import { ExpenseService } from '../../services/expense-service';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category-service';

@Component({
  selector: 'app-expense-list',
  imports: [CommonModule],
  templateUrl: './expense-list.html',
  styleUrl: './expense-list.scss'
})

export class ExpenseList implements OnInit {
  private expenseService = inject(ExpenseService);
  private categoryService = inject(CategoryService);
  //Crio uma variável-array que vai receber os dados passado que será a minha lista de gastos


  expenses = this.expenseService.expenses;

  categories = this.categoryService.getCategories();

  // expenses = signal<Expense[]>([]);

  //tbm vou receber o array de categorias para poder separar as categorias.
  // categories: Category[] = [];


  @Input() userId!: string;
  @Input() tripId!: string;


  ngOnInit() {
    if (this.userId && this.tripId) {
      this.expenseService.loadExpenses(this.userId, this.tripId).subscribe();
    }
  }

  getTotalByCategory(categoryId: string): number {
    return this.expenseService.totalByCategory(categoryId)();
  }

  deleteExpense(expenseId: string) {
    this.expenseService.deleteExpense(this.userId, this.tripId, expenseId).subscribe(() => {
      this.expenseService.loadExpenses(this.userId, this.tripId).subscribe();
    });
  }

  // ngOnInit() {
  //   this.categories = this.categoryService.getCategories();
  //   this.loadExpenses();
  // }

  // loadExpenses() {
  //   if (!this.userId || !this.tripId) return;

  //   this.expenses = this.expenseService.getExpenses();
  //   console.log('expenses', this.expenses);

  //   this.expenseService.getExpensesFromFirebase(this.userId, this.tripId).subscribe(
  //     (res: { [key: string]: any }) => {

  //       if (!res) {
  //         this.expenses = [];
  //         return;
  //       }
  //       this.expenses = Object.keys(res).map(key => ({ id: key, ...res[key] }))
  //       this.expenseService.setExpenses(this.expenses);
  //     });
  // }

  // getExpensesByCategory(categoryId: string): Expense[] {
  //   return this.expenses.filter(expense => expense.categoryId === categoryId);
  // }

  // onDeleteExpense(expenseId: string) {
  //   return this.expenseService.deleteExpense(this.userId, this.tripId, expenseId).subscribe(() => {
  //     this.expenses = this.expenses.filter(e => e.id !== expenseId);
  //   });

  // }

  // getTotalByCategory(categoryId: string): number {
  //   return this.expenses.filter(expense => expense.categoryId === categoryId).
  //     reduce((sum, exp) => sum + exp.value, 0);
  // }

}







