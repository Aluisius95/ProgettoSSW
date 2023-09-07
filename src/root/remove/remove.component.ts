import { Component, OnInit } from '@angular/core';
import { DblibService } from '../db-lib.service';
import { CommonModule } from '@angular/common';
import { AjaxResponse } from 'rxjs/ajax';
import { libElem } from '../libElem';


@Component({
  selector: 'app-remove',
  templateUrl: './remove.component.html',
  styleUrls: ['./remove.component.css'],
  imports: [
    CommonModule,
  ],
  providers: [DblibService],
  standalone: true
})
export class RemoveComponent implements OnInit {
  lista: Array<libElem> = [];
  posizione: string = '';
  delBook(){
    //questa funzione serve a ricercare il libro da eliminare in base alla posizione
    //separata in due funzioni poiché questa permette la verifica del titolo prima della rimozione
    var input: HTMLInputElement = document.getElementById("del") as HTMLInputElement;
    this.posizione = input.value;
    let reg = new RegExp(this.posizione, 'i');
    this.ds.getData().subscribe({
      next: (x: AjaxResponse<any>) => {
        this.lista = JSON.parse(x.response);
        this.lista.forEach((foundElem: any) => {
          //gli elementi che corrispondono alla ricerca, teoricamente uno visto che la posizione è univoca, 
          //vengono inseriti all'interno di un select che viene utilizzato successivamente dalla funzione elim()
          if (this.posizione !== '' && foundElem['posizione'].search(reg) != -1)
            this.selezione.push(foundElem);
        })
      },
      error: (err) => console.error('Obs got an error on remove: ' + JSON.stringify(err))
    });
    this.selezione = [];
    setTimeout(function(){input.value = '';}, 20000);
  }
  selezione: Array<libElem> = [];

  elim(){
    //una volta ottenuta la lista di elementi, tramite la select presente nell'HTML possiamo selezionare il titolo da rimuovere
    var input: HTMLInputElement = document.getElementById("el") as HTMLInputElement;
    var output = document.getElementById('esitoRim');
    var element = input.value;
    let msg: number = 0;
    var listaJSON: string;
    this.ds.getData().subscribe({
      next: (x: AjaxResponse<any>) => {
        this.lista = JSON.parse(x.response);
        this.lista.forEach((foundElem: any) => {
          //verifichiamo che il campo non sia vuoto, che la posizione e titolo corrispondano e che non ci sia un prestito attivo
          if (element !== '' && foundElem['posizione'] === this.posizione && foundElem['prestito'] === undefined && foundElem['titolo'] === element){
            let x = this.lista.indexOf(foundElem);
            this.lista.splice(x , 1);
            msg = 1;
          }
        })
        listaJSON = JSON.stringify(this.lista);
        //se tutto è andato bene, procediamo con l'invio al server del database aggiornato
        this.ds.setData(listaJSON).subscribe({
          next: () => {
            if(msg===1)
              output!.innerHTML = 'Libro rimosso con successo'
            else
              output!.innerHTML = 'Libro in prestito!'},
          error: (err) => output!.innerHTML = 'Errore nella rimozione: '+ err.response,
        })
        
      },
      error: (err) => console.error('Obs got an error on remove: ' + JSON.stringify(err))
    })
    this.selezione = [];
    setTimeout(function(){output!.innerHTML = '';}, 3000); 
  }
  constructor(private ds: DblibService) { }
  ngOnInit() { }
}