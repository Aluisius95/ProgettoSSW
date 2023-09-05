import { Component, OnInit } from '@angular/core';
import { DblibService } from '../db-lib.service';
import { CommonModule } from '@angular/common';
import { AjaxResponse } from 'rxjs/ajax';
import { libElem } from '../libElem';

@Component({
  selector: 'app-lending',
  templateUrl: './lending.component.html',
  styleUrls: ['./lending.component.css'],
  imports: [
    CommonModule
  ],
  providers: [DblibService],
  standalone: true
})
export class LendingComponent implements OnInit {
  lista: Array<libElem> = [];
  addPrestito(){}
  remPrestito(){}
  constructor(private ds: DblibService) { }
  ngOnInit() { }
}