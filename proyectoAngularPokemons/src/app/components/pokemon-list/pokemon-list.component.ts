import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit,OnDestroy {
  pokemon: any[] = []


  public lastNumber = 20


  public firstNumber = 1


  public page = 0


  private unsubcribe$ = new Subject<void>();


  constructor(private pokemonSrv: PokemonService){}

  ngOnDestroy(): void {
    this.unsubcribe$.next()
  }


  //se ejecuta nada más el componente se inicia
  ngOnInit(): void {
    this.addData(this.firstNumber, this.lastNumber)
  }


  //añadir datos a la array de pokémon con la subscripción a la api
  /**
   * pipe: se utiliza para aplicar operadores en un flujo de datos
   * takeUntil: operador que sirve para cerrar el flujo de datos cuando el observable (unsubcribe$) emita un valor
   */
  addData(firstNumber: number, lastNumber: number){
    for(let i=firstNumber; i<lastNumber; i++){
      if(i>251){} else {
        this.pokemonSrv.getPokemon(i).pipe(
          takeUntil(this.unsubcribe$),
          tap((data) => {
            if(data){
              this.pokemon.push(data)
            }
          }
          )
        ).subscribe()
      }
    }
  }
  onPaginateChange(event$:any){
    this.pokemon = []
    console.log(event$)

    this.page=event$.pageIndex+1
    this.lastNumber= 20 * this.page
    this.firstNumber = this.lastNumber-19
    this.addData(this.firstNumber,this.lastNumber)

  }
}
