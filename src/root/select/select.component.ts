import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { libElem } from '../libelem';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class SelectComponent implements OnInit {
  @Output() selEvent = new EventEmitter<string>();
  constructor() {}
  ngOnInit() {}
  selBook() {
    var input: HTMLInputElement = document.getElementById(
      'sel'
    ) as HTMLInputElement;
    var bookName = input.value;
    this.selEvent.emit(bookName);
  }

  @Input() selezione: Array<libElem> | undefined;
}
