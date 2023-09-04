import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';

@Injectable({
  providedIn: 'root',
})
export class DblibService {
  apiKey: string = '0cce527a';
  URL: string =
    'https://eu-central-1.aws.data.mongodb-api.com/app/kvaas-giwjg/endpoint/get?key=' +
    this.apiKey;
  constructor() {}
  public getData(): Observable<AjaxResponse<any>> {
    return ajax({
      method: 'GET',
      url: this.URL,
      crossDomain: true,
    });
  }
}
