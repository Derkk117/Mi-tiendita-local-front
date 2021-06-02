import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Address } from '../models/Address_model';
import { Store } from '../models/Store_model';

@Component({
  selector: 'app-create-store-dialog',
  templateUrl: './create-store-dialog.component.html',
  styleUrls: ['./create-store-dialog.component.scss'],
  // providers: [{ provide: NGX_MAT_FILE_INPUT_CONFIG, useValue: config }]
})

export class CreateStoreDialogComponent implements OnInit {
  store = new Store(0 , 0, "", "", "", 0, "");
  address = new Address(null,"","","","","","","","");
  public imagePath;
  imgURL: any;
  public imagePath2;
  imgURL2: any;
  public message: string;
  
  constructor(
    public dialogRef: MatDialogRef<CreateStoreDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(){
  }

  select(event: any){
    let files = [].slice.call(event.target.files);
    var reader = new FileReader();
    this.imagePath = event.target.files[0];
    reader.readAsDataURL(event.target.files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }

  select2(event: any){
    let files = [].slice.call(event.target.files);
    var reader = new FileReader();
    this.imagePath2 = event.target.files[0];
    reader.readAsDataURL(event.target.files[0]); 
    reader.onload = (_event) => { 
      this.imgURL2 = reader.result; 
    }
  }

  confirm() {
    // closing itself and sending data to parent component
    this.dialogRef.close({
      store: this.store,
      address: this.address,
      logo: (this.imagePath == null)?null:this.imagePath,
      thum: (this.imagePath2 == null)?null:this.imagePath2
    } )
  }
  // cancel(){
  //   this.dialogRef.close();
  // }
}
