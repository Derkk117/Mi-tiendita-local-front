import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Address } from 'src/app/shared/models/Address_model';
import { Supplier } from 'src/app/shared/models/Supplier_model';
import { AddressService } from 'src/app/shared/services/Address_service';
import { HistoryService } from 'src/app/shared/services/History_service';
import { SupplierService } from 'src/app/shared/services/Supplier_service';
import { UserService } from 'src/app/shared/services/User_service';
import { MatDialog , MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-suppliers-edit',
  templateUrl: './suppliers-edit.component.html',
  styleUrls: ['./suppliers-edit.component.scss'],
  providers: [
    SupplierService, 
    HistoryService, 
    AddressService,
    UserService,
    ToastrService
  ]
})
export class SuppliersEditComponent implements OnInit {

  supplierSlug =null;
  supplier: Supplier;
  supplierAddress: Address;
  history ={}
  date = new Date();
  token; 
  identity;

  constructor(
    private router: Router, 
    public dialog: MatDialog,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private _historyService: HistoryService,
    private _addressService: AddressService,
    private _supplierService: SupplierService,
  ) { 
    this.supplierSlug = this.activatedRoute.snapshot.paramMap.get('slug');
  }

  ngOnInit(): void {

    this.supplier = new Supplier(null,"","","","",null,"");
    this.supplierAddress = new Address(null, "", "", "", "", "", "", "", "");
    this.identity = JSON.parse(localStorage.getItem('identity'));
    this.token = localStorage.getItem('session');
    if(this.supplierSlug && this.token != null){
      this._supplierService.getSupplier(this.token, this.supplierSlug).subscribe(response=>{
        this.supplier = response;
        this._addressService.getAddress(this.supplier.address,this.token).subscribe(
          response =>{
            this.supplierAddress = response;
          }
        )
      },
      error =>{
        console.log(error)
      });
    }    
  }

  goToBack(){
    this.router.navigate(['/suppliers/index']);
  }

  save(){
    this._addressService.update(this.token,this.supplier.address,this.supplierAddress).subscribe(
      response=>{
        this._supplierService.update(this.token,this.supplier.slug,this.supplier).subscribe(
          response => {
            this.date = new Date();
                this.history = 
                { 
                  "id_user": this.identity.id, 
                  "description": "Actualizacion de proveedor",
                  "date": this.date.getFullYear() +"-"+ (this.date.getMonth()+1) +"-"+this.date.getDate(),
                  "time": this.date.getHours() +":"+this.date.getMinutes()+":"+this.date.getSeconds()
                };
                this._historyService.create(this.history,this.token).subscribe(
                  response=>{
                    this.toastr.success("Se ha actualizado exitosamente el proveedor");
                    this.router.navigate(['/suppliers/index']);
                  }
                )
          }
        )
      }
    )
  }
}
