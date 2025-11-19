import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

//Models
import { type Trip } from '../../models/trip.model';
import { type Expense } from '../../models/expense.model';

//Services
import { TripService } from '../../services/trip-service';
import { ExpenseList } from "../../components/expense-list/expense-list";
import { ExpenseService } from '../../services/expense-service'
import { ImageService } from '../../services/image-service';

//Components
import { Button } from '../../shared/button/button';
import { Image } from '../../components/image/image';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Auth } from '../../services/auth-service';
import { Observable, take } from 'rxjs';
import { User } from '../../models/user.model';


@Component({
  selector: 'app-trip-details',
  imports: [ExpenseList, Button, CommonModule, Image, RouterLink],
  templateUrl: './trip-details.html',
  styleUrl: './trip-details.scss'
})
export class TripDetails implements OnInit {
  private imageService = inject(ImageService);
  private http = inject(HttpClient);
  private authService = inject(Auth);

  //FireBase database
  firebaseDataBase = environment.apis.firebase.firebaseTETDataBase;

  //declaro uma propriedade aqui, onde irá receber valores de Trip. Ou tbm pode ser undefined
  trip?: Trip;
  days?: string;
  tripId: string = '';
  showImageModal: boolean = false;

  //é como se fosse meu array com todos os gastos
  expenses?: Expense[];

  totalExpense = 0;

  //Eu preciso ter acesso ao service, então eu faço um constructor. Tanto do service quanto da rota. (URL)
  constructor(private expenseService: ExpenseService, private tripService: TripService, private route: ActivatedRoute, private router: Router) { }


  userId!: string;

  userArr!: User[]

  selectedCategory!: string;

  ngOnInit() {
    this.authService.currentUser.pipe(take(1)).subscribe(user => {
      if (!user || !user.token)
        
        return;

      this.userArr = [user];
      this.userId = this.userArr[0].id;
      console.log("USER ID:", this.userId);
      const token = user.token;

      this.tripId = this.route.snapshot.paramMap.get('id')!;


      if (this.tripId) {

        this.tripService.getTripById(this.userId, this.tripId, token).subscribe(t => {
          this.trip = t;
        });
      }

      
      console.log("TRIP ID:", this.tripId);
      console.log("CATEGORY:", this.selectedCategory);

      return;

    })

    this.totalExpense = this.expenseService.getTotalExpenses();
  }

  openNewExpense(tripId: string) {
    console.log('Botão clicado', tripId);

    if (tripId) {
      this.router.navigate(['/expense-form', tripId]);
    }
  }

  openNewBackground() {
    this.showImageModal = true;
  }

  closeImageModal() {
    this.showImageModal = false;
  }

  imageSelected(image: any) {
    if (this.trip) {
      this.trip.selectedImage = image;
      this.showImageModal = false;
    }
  }
}