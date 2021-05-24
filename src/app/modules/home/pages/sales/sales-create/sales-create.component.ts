import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { Sale } from 'src/app/shared/models/Sale_model';

@Component({
  selector: 'app-sales-create',
  templateUrl: './sales-create.component.html',
  styles: [`
  .outer{
    height:200px;
    line-height: 200px;
  }

  .container-form{
    width: 50%;
    margin: 1rem auto;
    box-shadow: -1px 3px 66px 0px rgba(92,158,173,1);
    padding: 1rem;
    border-radius: 10px;
  }

  select{
    border-radius: 10px;
    width:75%;
    text-align: center;
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
    width: 75%;
    text-align: center;
  }

  textarea{
    border-radius: 10px;
    width: 75%;
    text-align: center;
  }

  .mat-button{
    color: #FFFFFF;
    background-color: #326273;
  }
  `]
})
export class SalesCreateComponent implements OnInit {


  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  
  addregreso(){    
    this.router.navigate(['sales/']);
  }

  ingresaSales(){
  }
  lista:string[]=["CASH", "CARD"];
  seleccionado = "";
  
   
}

