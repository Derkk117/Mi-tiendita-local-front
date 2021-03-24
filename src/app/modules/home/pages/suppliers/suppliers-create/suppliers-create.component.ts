import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-suppliers-create',
  templateUrl: './suppliers-create.component.html',
  styles: [`

  .outer{
    height:200px;
    line-height: 200px;
  }

  .container-form{
    width: 25%;
    margin: 1rem auto;
    box-shadow: -1px 3px 66px 0px rgba(92,158,173,1);
    padding: 1rem;
    border-radius: 10px;
  }

  select{
    border-radius: 10px;
  }

  mat-form-field{
    font-size: 14px;
    width: 100%;
    padding: 1rem;
    margin: 1rem auto;
    border: 1px;
    border-radius: 10px;
  }

  input{
    border-radius: 10px;
  }

  .mat-button{
    color: #FFFFFF;
    background-color: #326273;
  }
  `]
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
