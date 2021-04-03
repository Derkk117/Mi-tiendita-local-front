import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-store-create',
  templateUrl: './store-create.component.html',
  styles: [
  `
  .container{
    width: 45%;
    margin: 1rem auto;
    box-shadow: -1px 3px 66px 0px rgba(0,0,0,0.75);
    padding: 1rem;
    border-radius: 10px;
   } 

   form{
    font-size: 14px;
    width: 100%;
    padding: 1rem;
    margin: 1rem auto;
    border: 1px;
    border-radius: 10px;
   }

   button{
    color: #FFFFFF;
    background-color: #326273;
   }
   
   img{
    border: 5px;
    border-style: solid;
    border-radius: 10px;
    border-color: #808080;
   }
  `
  ]
})
export class StoreCreateComponent implements OnInit {

  public form: FormGroup;

  constructor() { }

  @ViewChild('fileInput', {read: ElementRef}) private fileInput: ElementRef;

  ngOnInit(): void {
  }


  File(event){
    if(event.target.files.length > 0 ){
      let file = event.target.files[0];
      this.form.get('file').setValue(file);
      console.log(file.toString());
    }
    console.log("entre");
  }

}
