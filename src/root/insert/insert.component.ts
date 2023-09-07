import { Component, OnInit } from '@angular/core';
import { DblibService } from '../db-lib.service';
import { CommonModule } from '@angular/common';
import { AjaxResponse } from 'rxjs/ajax';
import { libElem } from '../libElem';

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
    //inizializzazione elementi per ricavare dai campi di input e altre variabili di appoggio
    var inputT: HTMLInputElement = document.getElementById("titolo") as HTMLInputElement;
    var inputA: HTMLInputElement = document.getElementById("autore") as HTMLInputElement;
    var inputP: HTMLInputElement = document.getElementById("posizione") as HTMLInputElement;
    var titleEl: string = inputT.value;
    var authorEl: string = inputA.value;
    var positionEl: string = inputP.value;
    let check: number = 0;
    var listaJSON: string;
    var output = document.getElementById('esitoAdd');

    //se i tre campi non sono vuoti inizio con la ricezione del db e l'inserimento dell'aggiornamento
    if( titleEl !== '' && authorEl !== '' && positionEl !== '' ){
      //con questo subscribe ricavo innanzitutto il database e controllo che la posizione non sia già occupata, in quanto chiave primaria
      this.ds.getData().subscribe({
        next: (x: AjaxResponse<any>) => {
          this.lista = JSON.parse(x.response);
          this.lista.forEach((selElem: any) => {
            if (selElem['posizione'] === positionEl)
              //se occupata, non inserisco il libro
              check = 1;
              output!.innerHTML = 'Posizione già occupata!';
          });
          if( !check ){ 
            //altrimenti creo un nuovo oggetto e lo inserisco in coda all'array
            var tempEl = new libElem(authorEl, titleEl, positionEl, undefined);
            this.lista.push(tempEl);
            listaJSON = JSON.stringify(this.lista);
            //dopo aver reso una stringa il nuovo array, invoco una nuova subscribe che aggiornerà il DB
            this.ds.setData(listaJSON).subscribe({
              next: () => output!.innerHTML = 'Libro aggiunto con successo!',
              error: (err) => console.error("Errore nell'aggiunta 2" + err)
            })
          }
        },
        error: (err) => console.error("Errore nell'aggiunta 1" + err)
      })
      setTimeout(function(){output!.innerHTML = '';inputA.value = '';inputT.value = '';inputP.value = '';}, 3000);      
    }
  }
  constructor(private ds: DblibService) {}
  ngOnInit() {}
}