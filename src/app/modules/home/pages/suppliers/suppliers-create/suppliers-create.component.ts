import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { MatDialog , MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Address } from 'src/app/shared/models/Address_model';
import { Supplier } from 'src/app/shared/models/Supplier_model';
import { UserService } from 'src/app/shared/services/User_service';
import { HistoryService } from 'src/app/shared/services/History_service';
import { AddressService } from 'src/app/shared/services/Address_service';
import { SupplierService } from 'src/app/shared/services/Supplier_service';


@Component({
  selector: 'app-suppliers-create',
  templateUrl: './suppliers-create.component.html',
  styleUrls: ['./suppliers-create.component.scss'],
  providers:[
    SupplierService, 
    UserService,
    ToastrService, 
    HistoryService, 
    AddressService],
})

export class SuppliersCreateComponent implements OnInit {

  public supplier: Supplier;
  public supplierAddress: Address;
  identity;
  token;
  history ={};
  date = new Date();

  constructor(
    private router: Router,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private _addressService: AddressService,
    private _supplierService: SupplierService,
    private _userService: UserService,
    private _historyService: HistoryService
  ){ 

  }

  ngOnInit(): void {
    this.identity = JSON.parse(localStorage.getItem('identity'));
    this.token = localStorage.getItem('session');
    this.supplier = new Supplier(null,"","","","",null,"");
    this.supplierAddress = new Address(null, "", "", "", "", "", "", "", "");
  }

  /*lista:string[]=["address 1", "address2"];
  seleccionado = "";*/

  /*email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return '';
    }

    return this.email.hasError('email') ? 'Email invalid' : '';
  }*/

  create(){
    //console.log(this.supplier);
    //console.log(this.supplierAddress);
    //this._addressService.
    this._addressService.create(this.token,this.supplierAddress).subscribe(
      response => {
        this._addressService.getLast(this.token).subscribe(
          response => {
            this.supplier['address'] = response.id;
            console.log(this.supplier);
            this._supplierService.create(this.supplier,this.token).subscribe(
              response=>{
                this.date = new Date();
                this.history = 
                { 
                  "id_user": this.identity.id, 
                  "description": "Registro de proveedor",
                  "date": this.date.getFullYear() +"-"+ (this.date.getMonth()+1) +"-"+this.date.getDate(),
                  "time": this.date.getHours() +":"+this.date.getMinutes()+":"+this.date.getSeconds()
                };
                this._historyService.create(this.history,this.token).subscribe(
                  response=>{
                    this.toastr.success("Se ha creado exitosamente el proveedor");
                    this.router.navigate(['/suppliers/index']);
                  }
                )

              }
            )
          }
        )
      },error =>{
        this.toastr.error("Error al ingresar al proveedor, vuelte a intentarlo");
      }
    )
  }

  goBack(){
    this.router.navigate(['/suppliers/index']);
  }

  openDialog():void {



    /*const dialogRef = this.dialog.open(CreateAddressDialogComponent,{
      disableClose: true,
      width: '500px',
      height: '500px',
      data: { title: "Ingresa la direccion del proveedor :)", body: "Para terminar de registrar al nuevo proveedor ingresa su direccion." }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result == 'Continuar') {
        
      }
    });*/
  }
}
