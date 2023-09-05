import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';

@Injectable({
  providedIn: 'root'
})
export class DbsetService {
  URL: string = 'https://eu-central-1.aws.data.mongodb-api.com/app/kvaas-giwjg/endpoint/set?key=0cce527a';
  constructor() { }
  public setData(listaJSON: string): Observable<AjaxResponse<any>>{
    return ajax({
      method: 'POST',
      body: listaJSON,
      url: this.URL,
      crossDomain: true
    })
  }
}
