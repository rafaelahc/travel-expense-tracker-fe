import { Component, ElementRef, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TripService } from '../../services/trip-service';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
import { Trip } from '../../models/trip.model';

import { Image } from '../../components/image/image';

import { Button } from '../../shared/button/button';

//Control inputs
import { Control } from '../../shared/control/control';
import { ImageService } from '../../services/image-service';
import { Auth } from '../../services/auth-service';
import { take } from 'rxjs';

@Component({
  selector: 'app-trip-form',
  imports: [FormsModule, ReactiveFormsModule, RouterModule, Control, Button],
  templateUrl: './trip-form.html',
  styleUrl: './trip-form.scss'
})
export class TripForm {
  imageService = inject(ImageService);
  tripService = inject(TripService);
  authService = inject(Auth);
  router = inject(Router);

  selectedImage = null;

  tripForm = new FormGroup({
    destination: new FormControl('', [Validators.required]),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    peopleQty: new FormControl('')
  });


  onSubmit() {
    console.log(this.tripForm);

    //pegar a quantidade de dias
    const startDate = new Date(this.tripForm.value.startDate!);
    const endDate = new Date(this.tripForm.value.endDate!);
    const dateDiferenceInMs = endDate.getTime() - startDate.getTime();
    const totalMsperDay = 1000 * 60 * 60 * 24; //Milisegundos que existe em 1 dia.
    const days = dateDiferenceInMs / totalMsperDay;

    const newTrip: Trip = {
      id: '',
      destination: this.tripForm.value.destination!,
      startdate: this.tripForm.value.startDate!,
      enddate: this.tripForm.value.endDate!,
      days: days,
      peopleQty: this.tripForm.value.peopleQty!,
      selectedImage: this.selectedImage
    };

    this.imageService.getRamdomImage(this.tripForm.value.destination!).subscribe(
      img => {
        newTrip.selectedImage = img;
        //Depois que eu atribuo a imagem que retornou eu adiciono a trip
        this.authService.currentUser.pipe(take(1)).subscribe(user => {
          if (!user) return;
          // Agora sim adiciona a viagem no nó do usuário
          this.tripService.addTrip(user.id, newTrip, user.token!).subscribe((res: any) => {
            newTrip.id = res.name;
            this.router.navigate(['/trip-details', newTrip.id]);
          });
        });
      }
    )


  }


}



