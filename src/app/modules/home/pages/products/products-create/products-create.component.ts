

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-products-create',
  templateUrl: './products-create.component.html',
  styleUrls: ['./products-create.component.scss']
  
})

export class ProductsCreateComponent implements OnInit {

  public form: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

  lista:string[]=["botana", "abarrotes"];
  seleccionado = "";

  @ViewChild('fileInput', {read: ElementRef}) private fileInput: ElementRef;
  
  File(event){
    if(event.target.files.length > 0 ){
      let file = event.target.files[0];
      this.form.get('file').setValue(file);
      console.log(file.toString());
    }
    console.log("entre");
  }

  
} 

