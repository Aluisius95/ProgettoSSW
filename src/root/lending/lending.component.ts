import { Component, OnInit, Input} from '@angular/core';
import { DblibService } from '../db-lib.service';
import { CommonModule } from '@angular/common';
import { AjaxResponse } from 'rxjs/ajax';
import { libElem } from '../libElem';

@Component({
  selector: 'app-lending',
  templateUrl: './lending.component.html',
  styleUrls: ['./lending.component.css'],
  imports: [CommonModule],
  providers: [DblibService],
  standalone: true
})
export class LendingComponent implements OnInit {
  lista: Array<libElem> = [];
  libro: libElem | undefined;
  msgUpd: string | undefined;
  updatePrestito(){
    //variabili di appoggio per acquisizione o stampa dati
    var inputPos: HTMLInputElement = document.getElementById("posizionePR") as HTMLInputElement;
    var inputPers: HTMLInputElement = document.getElementById("addPr") as HTMLInputElement;
    var listaJSON: string;
    var pos: string = inputPos.value;
    
    //chiamo il DB per ottenere l'array aggiornato
    this.ds.getData().subscribe({
      next: (x: AjaxResponse<any>) => {
        this.lista = JSON.parse(x.response);
        var persP: string = inputPers.value;
        this.lista.forEach((foundElem: any) => {
          //cerco l'elemento specifico, ossia che abbia la stessa posizione selezionata e che il campo input non sia vuoto
          if(pos !== ''  && pos === foundElem['posizione']){
            this.libro = foundElem;
            //verifica se deve essere effettuato un prestito o una rimozione prestito
            if(persP !== ''){
              //se deve effettuare un prestito, verificherà a sua volta che non ci sia un prestito attivo
              if(foundElem['prestito'] === undefined){
              foundElem['prestito'] = persP;
              this.msgUpd = "Prestito aggiornato!";
              } else {
              this.msgUpd = "Prestito già attivo a "+ foundElem['prestito'];
              }
            } else {
              foundElem['prestito'] = undefined;
              this.msgUpd = "Prestito rimosso!";
            }
          }
        })
        listaJSON = JSON.stringify(this.lista);
        //reimposto l'array come stringa e lo invio al server per aggiornare i nuovi dati
        this.ds.setData(listaJSON).subscribe({
          next: () => console.log("Fatto!"),
          error: (err) => console.error("Error on loading: " + err)
        })
      },
      error: (err) => console.error("Got an error taking the whole DB: " + err)
    })
    setTimeout(function(){ inputPos.value=''; inputPers.value='';}, 3000);

  }
  constructor(private ds: DblibService) { }
  ngOnInit() { }
  
}