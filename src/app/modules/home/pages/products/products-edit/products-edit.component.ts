import { Component, OnInit,  ViewChild, ElementRef  } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styles: [`
  .outer{
    height:200px;
    line-height: 200px;
  }

  .container{
    width: 45%;
    margin: 1rem auto;
    box-shadow: -1px 3px 66px 0px rgba(0,0,0,0.75);
    padding: 1rem;
    border-radius: 10px;
   } 
  select{
    border-radius: 10px;
  }

  input{
    border-radius: ;
  }
  .mat-button{
    color: #FFFFFF;
    background-color: #326273;
  }
  form{
    font-size: 14px;
    width: 100%;
    padding: 1rem;
    margin: 1rem auto;
    border: 1px;
    border-radius: 10px;
   }
   img{
    width: 40px;
    height: 40px;
  }
  `]
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
