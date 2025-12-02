import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../environments/environment';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ImageService {
  private http = inject(HttpClient);
  private apiPixabay = environment.apis.apiPixabay;
  private apiKey = environment.apiKeys.pixabay;

  //signals: Lista que vou receber as imagens da API e imagem selecionada pelo user
  images = signal<any[]>([]);
  selectedImage = signal<any | null>(null)

  //Estou pegando as imagens na base de dados com a query/pesquisa que o user vai fazer
  getImages(query: string): Observable<any> {
    const url = `${this.apiPixabay}?key=${this.apiKey}&q=${query}&image_type=photo`;
    return this.http.get(url).pipe(
      tap((res: any) => {
        this.images.set(res.hits);
      })
    );
  }

  //carregar uma imagem aleatória (De acordo com o que foi digitado) quando o user preenche as coisas no tripForm, essa imagem vai ser recebida no trip details
  getRamdomImage(query: string): Observable<any> {
    return this.getImages(query)
      .pipe(map(data => {
        const arrImages = data.hits; //retornar o array inteiro
        const randomImageIndex = Math.floor(Math.random() * arrImages.length); // "sortear" um índice aleatório desse array
        return arrImages[randomImageIndex];
      })
    );
  }


  changeImage(image: any) {
    this.selectedImage.set(image);
  }

} 
