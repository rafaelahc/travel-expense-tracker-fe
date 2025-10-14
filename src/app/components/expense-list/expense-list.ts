import { Component } from '@angular/core';
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
  //Crio uma variável que vai receber os dados passado que será a minha lista de gastos
  expenses: Expense[] = [];
  //tbm vou receber o array de categorias para poder separar as categorias.
  categories: Category[] = [];

  constructor(private expenseService: ExpenseService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.categories = this.categoryService.getCategories();
    this.expenses = this.expenseService.getExpenses();
  }

  getExpensesByCategory(categoryId: string): Expense[] {
    return this.expenseService.getExpenseByCategory(categoryId);
  }
}
