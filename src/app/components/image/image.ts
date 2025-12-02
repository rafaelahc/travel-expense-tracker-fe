import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ImageService } from '../../services/image-service';
import { FormsModule } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { TripService } from '../../services/trip-service';

@Component({
  selector: 'app-image',
  imports: [FormsModule],
  templateUrl: './image.html',
  styleUrl: './image.scss'
})

export class Image{
  imageService = inject(ImageService);
  tripService = inject(TripService);
  route = inject(ActivatedRoute);


  @Input() userQuery: string = ''; //receber de tripDetails o valor de destination

  @Output() imageSelected = new EventEmitter<any>();

  images = this.imageService.images;

  searchImage: string = '';

  ngOnInit() {
    if (this.userQuery) {
      this.imageService.getImages(this.userQuery).subscribe();
    }
  }

 //User tem a opção de escolher outra imagem.
  searchImageFromDB() {
    this.imageService.getImages(this.searchImage).subscribe();
  }

  selectedImage(image: any) {
    this.imageSelected.emit(image);
  }
}
