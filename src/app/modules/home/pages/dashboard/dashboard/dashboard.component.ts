import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/shared/services/Store_service';
import { AddressService } from 'src/app/shared/services/Address_service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateStoreDialogComponent } from 'src/app/shared/create-store-dialog/create-store-dialog.component';
import { Store } from 'src/app/shared/models/Store_model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [
    StoreService,
    AddressService,
    ToastrService,
  ]
})
export class DashboardComponent implements OnInit {
  identity;
  store = new Store(null,null,"","","",null,"");
  address;
  token;

  constructor(
    public dialog: MatDialog,
    private _storeService: StoreService,
    private _addressService: AddressService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('session');
    this.identity = JSON.parse(localStorage.getItem('identity'));
    if(this.identity.store_id == null){
      this.openDialog();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateStoreDialogComponent, {
      disableClose: true,
      width: '500px',
      height: '500px',
      data: { title: "Bienvenido por primera vez " + this.identity.email + " :)", body: "Para continuar a la aplicación, primero debes llenar algunos datos. No te tomará mucho tiempo, es facil y rapido." }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.store != undefined && result.address != undefined) {
        this.store = result.store;
        this.address = result.address;
        this._addressService.create(this.token, this.address).subscribe(
          response  =>{
            this._addressService.getLast(this.token).subscribe(
              response =>{
                this.store.address = response.id;
                this.store.user_id = this.identity.id;
                // Create store object with files.
                let storeData:FormData = new FormData();
                if(result.logo != undefined && result.logo != null) storeData.append('logo', result.logo, result.logo.name);
                if(result.thum != undefined && result.thum != null) storeData.append('thum', result.thum, result.thum.name);
                storeData.append('phone', this.store.phone);
                storeData.append('address', this.store.address.toString());
                storeData.append('user_id', this.store.user_id.toString());
                storeData.append('name', this.store.name);
              
                this._storeService.create(this.token, storeData).subscribe(
                  response =>{
                    // update user with store id.
                    localStorage.setItem('identity', JSON.stringify(response.message));
                    this.toastr.success(":)", 'Datos guardados correctamente.');
                  },
                  error =>{
                    console.log(error);
                    this.toastr.error("Error al guardar, vuelve a intentarlo más tarde.", 'Error');
                  }
                )
              },
              error =>{
                this.toastr.error("Error al guardar, vuelve a intentarlo más tarde.", 'Error');
              }
            )
          },
          error =>{
            this.toastr.error("Error al guardar, vuelve a intentarlo más tarde", 'Error');
          }
        )
      }
    });
  }
}