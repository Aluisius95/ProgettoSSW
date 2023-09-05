import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';

@Injectable({
  providedIn: 'root',
})
export class DblibService {
  URLa: string =
    'https://eu-central-1.aws.data.mongodb-api.com/app/kvaas-giwjg/endpoint/';
  URLb: string = "?key=0cce527a"
  constructor() {}
  public getData(): Observable<AjaxResponse<any>> {
    return ajax({
      method: 'GET',
      url: this.URLa + "get" + this.URLb,
      crossDomain: true,
    });
  }
  public setData(listaJSON: string): Observable<AjaxResponse<any>>{
    return ajax({
      method: 'POST',
      body: listaJSON,
      url: this.URLa + "set" + this.URLb,
      crossDomain: true
    })
  }
}
