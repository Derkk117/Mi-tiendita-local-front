import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { Sale } from 'src/app/shared/models/Sale_model';

@Component({
  selector: 'app-sales-create',
  templateUrl: './sales-create.component.html',
  styleUrls: 
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

