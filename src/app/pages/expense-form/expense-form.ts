import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

//Models
import { Expense } from '../../models/expense.model';
import { Category } from '../../models/category.model';

//Services
import { ExpenseService } from '../../services/expense-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category-service';

@Component({
  selector: 'app-expense-form',
  imports: [FormsModule],
  templateUrl: './expense-form.html',
  styleUrl: './expense-form.scss'
})

export class ExpenseForm {

  //crio as variáveis que irão receber os valores dos inputs:
  enteredCategoryId = ''; //será um array
  enteredDescription = '';
  enteredValue = 0;

  //Preciso instanciar o que vem do meu expense service:
  constructor(private expenseService: ExpenseService, private router: Router, private route: ActivatedRoute, private categoryService: CategoryService) { }

  categories: Category[] = [];

  ngOnInit() {
    this.categories = this.categoryService.getCategories();
  }

  selectedCategory(id: string) {
    this.enteredCategoryId = id;
    console.log('categoria ID', this.enteredCategoryId)
  }

  //método que acontecerá quando eu enviar o formulário
  onSubmit() {
    /* Crio o meu model */
    const tripId = this.route.snapshot.paramMap.get('id')!;
    const newExpense: Expense = {
      id: Date.now().toString(),
      tripId: tripId,
      categoryId: this.enteredCategoryId,
      description: this.enteredDescription,
      value: this.enteredValue
    }

    console.log('novo gasto', newExpense);

    this.expenseService.addExpense(newExpense);

    //Navegar para a página do trip details
    this.router.navigate(['/trip-details/', tripId]);
  }

}
