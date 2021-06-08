import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Store } from 'src/app/shared/models/Store_model';
import { StoreService } from 'src/app/shared/services/Store_service';
import { AddressService } from 'src/app/shared/services/Address_service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateStoreDialogComponent } from 'src/app/shared/create-store-dialog/create-store-dialog.component';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { DashboardService } from 'src/app/shared/services/Dashboard_service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [
    StoreService,
    AddressService,
    ToastrService,
    DashboardService
  ]
})
export class DashboardComponent implements OnInit {
  identity;
  store = new Store(null, null, "", "", "", null, "");
  address;
  token;
  productsMostSold = null;
  loading = true;

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [{ data: [0, 40] }, { data: [0, 30] }];

  constructor(
    public dialog: MatDialog,
    private _storeService: StoreService,
    private _addressService: AddressService,
    private toastr: ToastrService,
    private _dashboarService: DashboardService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('session');
    this.identity = JSON.parse(localStorage.getItem('identity'));
    if (this.identity.store_id == null) {
      this.openDialog();
    }
    this._dashboarService.getMostSold(this.token, this.identity.id, "2021", "06").subscribe(
      response => {
        this.productsMostSold = response;
        let index = []
        Object.keys(this.productsMostSold).map(function (key) {
          index.push(key);
        });
        let datas = [];
        let count = 0;
        index.forEach(element => {
          let arr = [];
          this.barChartLabels.push(this.productsMostSold[element]['name']);
          for (let i = 0; i < count; i++) {
            arr.push(0);
          }
          arr.push(this.productsMostSold[element]['qty']);
          for (let i = arr.length; i < 5; i++) {
            arr.push(0);
          }
          datas.push({
            data: arr,
            label: this.productsMostSold[element]['name'],
            backgroundColor: "rgba(255,99,132,0.6)",
            borderColor: "rgba(255,0,255,1)"
          });
          count++;
        });
        this.barChartData = datas;
        this.loading = false;
      },
      error => {

      }
    )
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
          response => {
            this._addressService.getLast(this.token).subscribe(
              response => {
                this.store.address = response.id;
                this.store.user_id = this.identity.id;
                // Create store object with files.
                let storeData: FormData = new FormData();
                if (result.logo != undefined && result.logo != null) storeData.append('logo', result.logo, result.logo.name);
                if (result.thum != undefined && result.thum != null) storeData.append('thum', result.thum, result.thum.name);
                storeData.append('phone', this.store.phone);
                storeData.append('address', this.store.address.toString());
                storeData.append('user_id', this.store.user_id.toString());
                storeData.append('name', this.store.name);

                this._storeService.create(this.token, storeData).subscribe(
                  response => {
                    // update user with store id.
                    localStorage.setItem('identity', JSON.stringify(response.message));
                    this.toastr.success(":)", 'Datos guardados correctamente.');
                  },
                  error => {
                    console.log(error);
                    this.toastr.error("Error al guardar, vuelve a intentarlo más tarde.", 'Error');
                  }
                )
              },
              error => {
                this.toastr.error("Error al guardar, vuelve a intentarlo más tarde.", 'Error');
              }
            )
          },
          error => {
            this.toastr.error("Error al guardar, vuelve a intentarlo más tarde", 'Error');
          }
        )
      }
    });
  }
}