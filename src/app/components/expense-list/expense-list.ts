import { Component, Input, SimpleChanges } from '@angular/core';
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

export class ExpenseList {
  //Crio uma variável-array que vai receber os dados passado que será a minha lista de gastos
  expenses: Expense[] = [];

  //tbm vou receber o array de categorias para poder separar as categorias.
  categories: Category[] = [];

  @Input() userId!: string;
  @Input() tripId!: string;
  @Input() selectedCategory!: string;

  constructor(private expenseService: ExpenseService, private categoryService: CategoryService) { }

  totalExpByCategory = 0;

  ngOnInit() {
    this.categories = this.categoryService.getCategories();

    console.log("Categorias no expense List:", this.categories);
    console.log("userId:", this.userId);
    console.log("tripId:", this.tripId);
    console.log("selectedCategory:", this.selectedCategory);

    this.loadExpenses();
  }

  getExpensesByCategory(categoryId: string): Expense[] {
    return this.expenses.filter(expense => expense.categoryId === categoryId);
  }

  getTotalByCategory(categoryId: string): number {
    return this.expenseService.getTotalByCategory(categoryId);
  }

  onDeleteExpense(expenseId: string) {
    return this.expenseService.deleteExpense(this.userId, this.tripId, expenseId).subscribe(() => {
      this.expenses = this.expenses.filter(e => e.id !== expenseId);
    });
  }

  loadExpenses() {
    if (!this.userId || !this.tripId) return;

    this.expenseService.getExpensesFromFirebase(this.userId, this.tripId).subscribe(
      (res: { [key: string]: any }) => {

        if (!res) {
          this.expenses = [];
          return;
        }

        this.expenses = Object.keys(res).map(key => ({ id: key, ...res[key] }))
        console.log('Despesas: ', this.expenses);

      });
  }
}







