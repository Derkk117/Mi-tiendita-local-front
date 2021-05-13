import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Address } from 'src/app/shared/models/Address_model';
import { Router } from '@angular/router';
import { SupplierService } from 'src/app/shared/services/Supplier_service';
import { Supplier } from 'src/app/shared/models/Supplier_model';
import { UserService } from 'src/app/shared/services/User_service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-suppliers-create',
  templateUrl: './suppliers-create.component.html',
  styleUrls: ['./suppliers-create.component.scss'],
  providers:[SupplierService, UserService],
})

export class SuppliersCreateComponent implements OnInit {

  public supplier;
  public supplierAddress;
  identity;
  token;

  constructor(
    private _supplierService: SupplierService,
    private router: Router,
    private _userService: UserService
  ){ 
    this.supplier = new Supplier(null,"","","",null);
    this.supplierAddress = new Address(null, "", "", "", "", "", "", "", "");
    this.identity = JSON.parse(localStorage.getItem('identity'));
    this.token = localStorage.getItem('session');
  }

  ngOnInit(): void {
  }

  lista:string[]=["address 1", "address2"];
  seleccionado = "";

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return '';
    }

    return this.email.hasError('email') ? 'Email invalid' : '';
  }

  create(){
    console.log(this.supplier);
    console.log(this.token);
    //console.log("holi");*
    if(this.supplier.name != "" && this.supplier.last_name &&
        this.supplier.email != ""){
        this._supplierService.create(this.supplier,this.token).subscribe(
          response => {
            //this.router.navigate(['suppliers']);
          }//response
        )///create-subscribe
    }////if campos
  }

  back(){
    this.router.navigate(['suppliers']);
  }
}
