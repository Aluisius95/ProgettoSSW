import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  
})
export class SelectComponent implements OnInit {
  @Output() selEvent = new EventEmitter<string>();
  constructor() {};
  ngOnInit() {};
  selBook() {
    var input: HTMLInputElement = document.getElementById('sel') as HTMLInputElement;
    var bookName = input.value;
    this.selEvent.emit(bookName);
    input.value = '';
  };
}
