import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-suppliers-create',
  templateUrl: './suppliers-create.component.html',
  styleUrls: ['./suppliers-create.component.scss']
})
export class SuppliersCreateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  lista:string[]=["address 1", "address2"];
  seleccionado = "";

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return '';
    }

    return this.email.hasError('email') ? 'Email invalid' : '';
  }
}
