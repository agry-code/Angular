import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {//observable que usaremos para mostrar o esconder el spinner
  isLoading$ = new Subject<boolean>()


  //metodo mostrar. El observable isLoading$ emite el valor true
  show(): void {
    this.isLoading$.next(true)
  }


  //metodo esconder. El observable isLoading$ emite el valor false
  hide(): void {
    this.isLoading$.next(false)
  }



}
