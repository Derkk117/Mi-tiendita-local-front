import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suppliers-edit',
  templateUrl: './suppliers-edit.component.html',
  styles: [`s
  .outer{
    height:200px;
    line-height: 200px;
  }

  .container-form{
    margin: 1rem auto;
    box-shadow: -1px 3px 66px 0px rgba(92,158,173,1);
    padding: 1rem;
    border-radius: 10px;
    width: 45%;
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
  }`]
})
export class SuppliersEditComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  lista:string[]=["address 1", "address2"];
  seleccionado = "";

}
