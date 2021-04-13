import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suppliers-edit',
  templateUrl: './suppliers-edit.component.html',
  styles: []
})
export class SuppliersEditComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  lista:string[]=["address 1", "address2"];
  seleccionado = "";

}
