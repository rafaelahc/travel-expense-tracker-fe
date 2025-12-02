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
  private authService = inject(Auth);
  private expenseService = inject(ExpenseService);
  private tripService = inject(TripService);
  private imageService = inject(ImageService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  //declaro uma propriedade aqui, onde irá receber valores de Trip. Ou tbm pode ser undefined
  trip?: Trip;
  tripId: string = '';
  showImageModal: boolean = false;

  selectedImage = this.imageService.selectedImage;

  //Acesso o meu signal do service.
  expenses = this.expenseService.expenses;

  totalGeneral = this.expenseService.totalGeneral;

  userId!: string;

  ngOnInit() {
    this.authService.currentUser.pipe(take(1)).subscribe(user => {
      if (!user || !user.token) return;
      this.userId = user.id;
      this.tripId = this.route.snapshot.paramMap.get('id')!;

      this.tripService.getTripById(this.userId, this.tripId, user.token).subscribe(trip => {
        this.trip = trip;

        if (trip.selectedImage) {
          this.imageService.selectedImage.set(trip.selectedImage);
        }

      });

      this.expenseService.loadExpenses(this.userId, this.tripId).subscribe();
    })
  }

  imageSelectedByUser(image: any) {
    if (this.trip) {
      this.tripService.updateTripImage(this.userId, this.tripId, image).subscribe();      
      this.imageService.changeImage(image);
      this.trip.selectedImage = this.selectedImage();
      this.showImageModal = false;
    }
  }

  openNewExpense(tripId: string) {
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



}