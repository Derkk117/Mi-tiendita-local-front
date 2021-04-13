import { Component, OnInit,  ViewChild, ElementRef  } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styles: []
})
export class ProductsEditComponent implements OnInit {

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
