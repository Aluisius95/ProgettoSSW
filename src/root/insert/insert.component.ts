import { Component, OnInit } from '@angular/core';
import { DblibService } from '../db-lib.service';
import { CommonModule } from '@angular/common';
import { AjaxResponse } from 'rxjs/ajax';
import { libElem } from '../libElem';
import { single } from 'rxjs';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css'],
  imports: [
    CommonModule,
  ],
  providers: [DblibService],
  standalone: true,
})
export class InsertComponent implements OnInit {
  lista: Array<libElem> = [];
  add(){
    var inputT: HTMLInputElement = document.getElementById("titolo") as HTMLInputElement;
    var inputA: HTMLInputElement = document.getElementById("autore") as HTMLInputElement;
    var inputP: HTMLInputElement = document.getElementById("posizione") as HTMLInputElement;
    var titleEl: string = inputT.value;
    var authorEl: string = inputA.value;
    var positionEl: string = inputP.value;
    let msg: number = 0;
    var listaJSON: string;
    var output = document.getElementById('esitoAdd');
    if( titleEl !== '' && authorEl !== '' && positionEl !== '' ){
      this.ds.getData().subscribe({
        next: (x: AjaxResponse<any>) => {
          this.lista = JSON.parse(x.response);
          this.lista.forEach((selElem: any) => {
            if (selElem['posizione'] === positionEl)
              msg = 1;
              output!.innerHTML = 'Posizione già occupata!';
          });
          if( !msg ){ 
            var tempEl = new libElem(authorEl, titleEl, positionEl, '');
            this.lista.push(tempEl);
            listaJSON = JSON.stringify(this.lista);
            this.ds.setData(listaJSON).subscribe({
              next: () => output!.innerHTML = 'Libro aggiunto con successo!',
              error: (err) => console.error("Errore nell'aggiunta 2" + err)
            })
          }
        },
        error: (err) => console.error("Errore nell'aggiunta 1" + err)
      })
      inputA.value = '';
      inputT.value = '';
      inputP.value = '';      
    }
  }
  constructor(private ds: DblibService) {}
  ngOnInit() {}
}