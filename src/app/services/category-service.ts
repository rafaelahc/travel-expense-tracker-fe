import { inject, Injectable } from '@angular/core';
import { Category } from '../models/category.model';

import { ExpenseService } from './expense-service';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  
  private categories: Category[] = [
    {
      id: '1',
      name: 'Transport'
    },
    {
      id: '2',
      name: 'Stays'
    },
    {
      id: '3',
      name: 'Food'
    },
    {
      id: '4',
      name: 'Others'
    },
  ];


  getCategories(): Category[] {
    return this.categories
  }


}
