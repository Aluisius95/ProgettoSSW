import { Component, OnInit } from '@angular/core';
import { DblibService } from '../db-lib.service';
import { CommonModule } from '@angular/common';
import { AjaxResponse } from 'rxjs/ajax';
import { libElem } from '../libElem';
import { DbsetService } from '../dbset.service';


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
  delBook(){
    var input: HTMLInputElement = document.getElementById("del") as HTMLInputElement;
    var element = input.value;
    let reg = new RegExp(element, 'i');
    this.ds.getData().subscribe({
      next: (x: AjaxResponse<any>) => {
        this.lista = JSON.parse(x.response);
        this.lista.forEach((foundElem: any) => {
          if (element !== '' && foundElem['titolo'].search(reg) != -1)
            this.selezione.push(foundElem);
        })
        console.log(this.lista);
        console.log(this.selezione);
      },
      error: (err) => console.error('Obs got an error on remove: ' + JSON.stringify(err))
    });
    this.selezione = [];
  }
  selezione: Array<libElem> = [];

  elim(){
    var input: HTMLInputElement = document.getElementById("el") as HTMLInputElement;
    var output = document.getElementById('esito');
    var element = input.value;
    var listaJSON: string;
    this.ds.getData().subscribe({
      next: (x: AjaxResponse<any>) => {
        this.lista = JSON.parse(x.response);
        this.lista.forEach((foundElem: any) => {
          if (element !== '' && foundElem['titolo'] === element && foundElem['prestito'] === '' ){
            let x = this.lista.indexOf(foundElem);
            this.lista.splice(x , 1);
          }
        })
        listaJSON = JSON.stringify(this.lista);
        this.sd.setData(listaJSON).subscribe({
          next: () =>
            output!.innerHTML = 'Libro rimosso con successo',
          error: (err) => output!.innerHTML = 'Errore nella rimozione: '+ err.response,
        })
        console.log(listaJSON);
      },
      error: (err) => console.error('Obs got an error on remove: ' + JSON.stringify(err))
    })
    input.value = '';
    this.selezione = [];
  }
  constructor(private ds: DblibService, private sd: DbsetService) { }
  ngOnInit() { }
}