import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-remove',
  templateUrl: './remove.component.html',
  styleUrls: ['./remove.component.css'],
  standalone: true
})
export class RemoveComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
//selezione db e rimozione libro da db se prestito è vuoto