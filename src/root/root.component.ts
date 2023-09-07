import { Component, OnInit, VERSION } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select/select.component';
import { InsertComponent } from './insert/insert.component';
import { LendingComponent } from './lending/lending.component';
import { RemoveComponent } from './remove/remove.component';
import { DblibService } from './db-lib.service';
import { AjaxResponse } from 'rxjs/ajax';
import { libElem } from './libElem';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    SelectComponent,
    InsertComponent,
    LendingComponent,
    RemoveComponent,
  ],
  providers: [DblibService],
})
export class RootComponent implements OnInit {
  angProj: string = 'Sviluppato in Angular ' + VERSION.major;
  lista: Array<libElem> = [];
  //elementi presenti nella funzione vengono ricavati tramite la comunicazione con il Child select.component
  selBook(element: string) {
    let reg = new RegExp(element, 'i');
    this.selezione = [];
    this.ds.getData().subscribe({
      next: (x: AjaxResponse<any>) => {
        this.lista = JSON.parse(x.response);
        this.lista.forEach((foundElem: any) => {
          //effettuata la chiamata del database, se il campo è compilato cercherà in base ad una regex
          //sia su titolo che su autore
          if ( element !== '' && (foundElem['autore'].search(reg) != -1 || foundElem['titolo'].search(reg) != -1) ) {
            this.selezione.push(foundElem);
          }
          //altrimenti, se il campo di ricerca è vuoto, seleziona tutto il database per intero
          else if (element === ''){
            this.selezione = this.lista;
          }
        });
      },
      error: (err) => console.error('Obs got an error: ' + JSON.stringify(err)),
    });
  }
  selezione: Array<libElem> = [];
  constructor(private ds: DblibService) {}
  ngOnInit() {}
}
