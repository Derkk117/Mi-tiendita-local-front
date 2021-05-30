import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Address } from '../models/Address_model';

@Component({
  selector: 'app-create-address-dialog',
  templateUrl: './create-address-dialog.component.html',
  styleUrls: ['./create-address-dialog.component.scss']
})
export class CreateAddressDialogComponent implements OnInit {

  address: Address;

  constructor(
    public dialogRef: MatDialogRef<CreateAddressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.address = new Address(null,"","","","","","","","");
  }

  ngOnInit(): void {
  
  }
}
