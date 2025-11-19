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

  images: any[] = [];
  searchImage = '';

  ngOnInit() {
    this.imageService.getImages(this.searchImage);

    if (this.userQuery) {
      this.loadImages(this.userQuery);
    }
  }

  //Carregar imagens aleatorias de acordo com o que foi digitado no destination do input do trip form.
  loadImages(query: string) {
    this.imageService.getImages(query)
      .subscribe((data) => {
        this.images = data.hits;
      })
  }


  //Selecionar imagens e enviar para o tripForm
  selectedImage(image: any) {
    this.imageSelected.emit(image);
  }


  //User tem a opção de escolher outra imagem.
  searchImageFromDB() {
    this.imageService.getImages(this.searchImage).subscribe(
      {
        next: (data) => {
          this.images = data.hits;
        },
        error: (err) => {
          console.error('Oops! Something went wrong while loading the images. Try again in a moment:', err);
        }
      }

    )
  }


}
