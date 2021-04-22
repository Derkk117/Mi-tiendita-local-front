import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-deliveries-edit',
  templateUrl: './deliveries-edit.component.html',
  styleUrls: ['./deliveries-edit.component.scss']
  
})
export class DeliveriesEditComponent implements OnInit {

  public form: FormGroup;
  constructor() {}
  


  ngOnInit(): void {
  }
  
  lista:string[]=["Delivered", "Pending", "Canceled", "On the way"];
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