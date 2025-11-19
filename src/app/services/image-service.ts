import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ImageService {
  private http = inject(HttpClient);
  private apiPixabay = environment.apis.apiPixabay;
  private apiKey = environment.apiKeys.pixabay;


  //Estou pegando as imagens na base de dados com a query/pesquisa que o user vai fazer
  getImages(query: string): Observable<any> {
    const url = `${this.apiPixabay}?key=${this.apiKey}&q=${query}&image_type=photo`;
    return this.http.get(url);
  }


  //carregar uma imagem aleatório quando o user preenche as coisas no tripForm, essa imagem vai ser recebida no trip details
  getRamdomImage(query: string): Observable<any> {
    return this.getImages(query)
      .pipe(map(data => {
        const hits = data.hits;
        const randomImageIndex = Math.floor(Math.random() * hits.length);
        return hits[randomImageIndex];
      })

    );
  }




}
