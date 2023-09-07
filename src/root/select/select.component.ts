import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { libElem } from '../libElem';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class SelectComponent implements OnInit {
  //comunicazione tra Parent e Child
  //l'output serve a selezionare l'elemento e inviarlo al parent come $event
  //in modo che effettui le ricerche all'interno dello script Root
  @Output() selEvent = new EventEmitter<string>();
  constructor() {}
  ngOnInit() {}
  selBook() {
    var input: HTMLInputElement = document.getElementById('sel') as HTMLInputElement;
    var bookName = input.value;
    this.selEvent.emit(bookName);
    input.value = '';
  }
  //i valori trovati all'interno di Root, vengono inviati al Child
  //per essere utilizzati nell'HTML e quindi nella selezione degli elementi utili
  @Input() selezione: Array<libElem> | undefined;
}
