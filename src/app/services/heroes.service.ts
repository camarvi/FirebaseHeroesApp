import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


import { HeroeModel } from '../models/heroe.model';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url='https://heroes-crud-a4358.firebaseio.com';

  constructor(private http : HttpClient) { }

  crearHeroe(heroe : HeroeModel){

      return this.http.post(`${ this.url }/heroes.json`,heroe)
          .pipe(
            map( (resp:any) =>{
              heroe.id = resp.name;
              return heroe;
            })
          );
  }

  actualizarHeroe(heroe : HeroeModel){

    //Creo una copia del objeto heroe
    const heroeTemp ={
      ...heroe
    };  

    delete heroeTemp.id

    return this.http.put(`${ this.url }/heroes/${heroe.id}.json`,heroeTemp);
}


}