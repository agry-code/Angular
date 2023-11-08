import { Injectable } from '@angular/core';
import { enviorment } from '../model/enviorment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  urlAPI = enviorment.baseURL

  public getPokemon(index: number){
    return this.http.get<any>(`${this.urlAPI}pokemon/${index}`)
  }
  //creamos el getGeneration para modificar la url y obtener la información de generations en la API
  public getGeneration(index: number){
    return this.http.get<any>(`${this.urlAPI}generation/${index}`)
  }
}
