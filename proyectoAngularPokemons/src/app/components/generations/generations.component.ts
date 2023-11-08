import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-generations',
  templateUrl: './generations.component.html',
  styleUrls: ['./generations.component.css']
})
export class GenerationsComponent implements OnInit,OnDestroy {
  generation: any[] = []

//modificar parametros para que sea por generaciones
  public lastNumber = 3


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
  // i<=lasNumber para poder mostrar los tres elementos porque si es i<lastNumber no tomara el tercer elemento
  addData(firstNumber: number, lastNumber: number){
    for(let i=firstNumber; i<=lastNumber; i++){
      if(i>9){} else {
        this.pokemonSrv.getGeneration(i).pipe(
          takeUntil(this.unsubcribe$),
          tap((data) => {
            if(data){
              this.generation.push(data)
            }
          }
          )
        ).subscribe()
      }
    }
  }
  onPaginateChange(event$:any){
    this.generation = []
    console.log(event$)
//modificar esto para que sea en 3 páginas:
    this.page=event$.pageIndex+1
    this.lastNumber= 3 * this.page
    this.firstNumber = this.lastNumber-2
    this.addData(this.firstNumber,this.lastNumber)
  }
}
