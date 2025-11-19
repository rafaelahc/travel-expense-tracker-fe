import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, Validators, ReactiveFormsModule } from '@angular/forms';

//Models
import { Expense } from '../../models/expense.model';
import { Category } from '../../models/category.model';

//Services
import { ExpenseService } from '../../services/expense-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category-service';

//Control
import { Control } from '../../shared/control/control';

//Components
import { Button } from '../../shared/button/button';


@Component({
  selector: 'app-expense-form',
  imports: [FormsModule, Control, Button, ReactiveFormsModule],
  templateUrl: './expense-form.html',
  styleUrl: './expense-form.scss'
})

export class ExpenseForm implements OnInit {

  private expenseService = inject(ExpenseService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private categoryService = inject(CategoryService);


  tripId!: string;

  //Reactive Forms
  expenseForm = new FormGroup({
    categoryId: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    value: new FormControl(0, [Validators.required])
  })


  /* Category */
  categories: Category[] = [];

  ngOnInit() {
    this.tripId = this.route.snapshot.paramMap.get('tripId')!;
    console.log('Na pagina de expense form, o tripId recebido foi:', this.tripId);
    this.categories = this.categoryService.getCategories();
  }

  selectedCategory(id: string) {
    this.expenseForm.get('categoryId')?.setValue(id);
  }

  formSubmitted = false;

  onSubmit() {
    this.formSubmitted = true;

    const userData = JSON.parse(localStorage.getItem('userData')!);
    const userId = userData.id;
    //Pegar o Id da viagem:

    const newExpense: Expense = {
      id: '', //precisa ser gerado no firebase
      tripId: this.tripId,
      categoryId: this.expenseForm.value.categoryId!,
      description: this.expenseForm.value.description!,
      value: this.expenseForm.value.value!
    }

    this.expenseService.addExpense(userId, newExpense).subscribe((res: any) => {
      newExpense.id = res.name;
      console.log('id expense:', res);
      console.log('Novo Gasto', newExpense);
    });

    //Navegar para a página do trip details
    this.router.navigate(['/trip-details/', this.tripId]);
  }

}
