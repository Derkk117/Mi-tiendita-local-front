import { Component, OnInit,  ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-deliveries-create',
  templateUrl: './deliveries-create.component.html',
  styleUrls: ['./deliveries-create.component.scss']
})
export class DeliveriesCreateComponent implements OnInit {

  public form: FormGroup;
  constructor (private router: Router) { }

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

  goBack(){
    this.router.navigate(['deliveries/']);
  }
}