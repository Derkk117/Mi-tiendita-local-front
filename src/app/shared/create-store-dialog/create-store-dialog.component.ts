import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '../models/Store_model';

@Component({
  selector: 'app-create-store-dialog',
  templateUrl: './create-store-dialog.component.html',
  styleUrls: ['./create-store-dialog.component.scss']
})
export class CreateStoreDialogComponent implements OnInit {
  store = new Store(0 , 0, "", "", "", 0, "");
  
  constructor(
    public dialogRef: MatDialogRef<CreateStoreDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(){
  }

  // cancel(){
  //   this.dialogRef.close();
  // }
}
