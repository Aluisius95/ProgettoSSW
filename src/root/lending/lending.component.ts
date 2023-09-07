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
  updatePrestito(){
    var msgUpd = document.getElementById('update');
    var inputPos: HTMLInputElement = document.getElementById("posizionePR") as HTMLInputElement;
    var inputTit: HTMLInputElement = document.getElementById("titoloPre") as HTMLInputElement;
    var inputPers: HTMLInputElement = document.getElementById("addPr") as HTMLInputElement;
    var listaJSON: string;
    var pos: string = inputPos.value;
    this.ds.getData().subscribe({
      next: (x: AjaxResponse<any>) => {
        this.lista = JSON.parse(x.response);
        var persP: string = inputPers.value;
        this.lista.forEach((foundElem: any) => {
          if(pos !== ''  && pos === foundElem['posizione']){
            inputTit.value = foundElem['titolo'];
            if(persP !== ''){
              if(foundElem['prestito'] === undefined){
              foundElem['prestito'] = persP;
              msgUpd!.innerHTML = "Prestito aggiornato!";
              } else {
              msgUpd!.innerHTML = "Prestito già attivo a "+ foundElem['prestito'];
              }
            } else {
              foundElem['prestito'] = undefined;
              msgUpd!.innerHTML = "Prestito rimosso!";
            }
          }
        })
        listaJSON = JSON.stringify(this.lista);
        this.ds.setData(listaJSON).subscribe({
          next: () => console.log("Fatto!"),
          error: (err) => console.error("Error on loading: " + err)
        })
      },
      error: (err) => console.error("Got an error taking the whole DB: " + err)
    })
    setTimeout(function(){msgUpd!.innerHTML = ''; inputPos.value=''; inputTit.value=''; inputPers.value='';}, 3000);

  }
  constructor(private ds: DblibService) { }
  ngOnInit() { }
  
}