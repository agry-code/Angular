import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(private spinnerService : SpinnerService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //cuando existe una peticion se llama al método show del service
    this.spinnerService.show()
    return next.handle(req).pipe(
      //utilizamos el operador finalize para captar cuando la petición termina y llamamos al método hide
      finalize( () => {
        this.spinnerService.hide()
      })
    )
  }



}
