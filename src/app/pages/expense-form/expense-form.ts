import { Component, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

//Models
import { Expense } from '../../models/expense.model';
import { Category } from '../../models/category.model';

//Services
import { ExpenseService } from '../../services/expense-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category-service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-expense-form',
  imports: [FormsModule],
  templateUrl: './expense-form.html',
  styleUrl: './expense-form.scss'
})

export class ExpenseForm {
  //crio as variáveis que irão receber os valores dos inputs:
  enteredCategoryId = '';
  enteredDescription = '';
  enteredValue = 0;

  constructor(private expenseService: ExpenseService, private router: Router, private route: ActivatedRoute, private categoryService: CategoryService) { }

  /* Category */
  categories: Category[] = [];

  ngOnInit() {
    this.categories = this.categoryService.getCategories();
  }

  selectedCategory(id: string) {
    this.enteredCategoryId = id;
  }

  formSubmitted = false;

  onSubmit(form: NgForm) {
    this.formSubmitted = true;

    // Impede o envio se faltar qualquer campo
    if (form.invalid || !this.enteredCategoryId) {
      console.warn('Formulário inválido. Preencha todos os campos.');
      return; // <-- Cancela o envio aqui!
    }


    /* Crio o meu model */
    const tripId = this.route.snapshot.paramMap.get('id')!;
    const newExpense: Expense = {
      id: Date.now().toString(),
      tripId: tripId,
      categoryId: this.enteredCategoryId,
      description: this.enteredDescription,
      value: this.enteredValue
    }

    this.expenseService.addExpense(newExpense);

    //Navegar para a página do trip details
    this.router.navigate(['/trip-details/', tripId]);
  }

}
