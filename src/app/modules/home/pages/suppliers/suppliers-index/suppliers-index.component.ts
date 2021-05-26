import { ToastrService } from 'ngx-toastr';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Supplier } from '../../../../../shared/models/Supplier_model';
import { Address } from '../../../../../shared/models/Address_model';
import { AddressService } from '../../../../../shared/services/Address_service';
import { HistoryService } from '../../../../../shared/services/History_service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SupplierService } from 'src/app/shared/services/Supplier_service';
import { DialogOverviewDelete } from 'src/app/shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-suppliers-index',
  templateUrl: './suppliers-index.component.html',
  styleUrls: ['./suppliers-index.component.scss'],
  providers: [
    AddressService,
    SupplierService,
    HistoryService,
    ToastrService
  ]
})

export class SuppliersIndexComponent implements OnInit {

  token;
  identity;
  suppliers = [];
  address = [];
  dataSource: any;
  history = {};
  date = new Date();
  selection = new SelectionModel<Supplier>(true, []);

  constructor(
    private router: Router,
    private _addressService: AddressService,
    private _supplierService: SupplierService,
    private _historyService: HistoryService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.identity = JSON.parse(localStorage.getItem('identity'));
    this.token = localStorage.getItem('session');
    this._supplierService.getSuppliers(this.token).subscribe(response => {
      this.suppliers = response;
      this.suppliers.forEach(element => {
        element['fullAddress'] = element['street'] + " " + ((element['street2'] = "null") ? " ":element['street2'])+ " #" + element['external_number'] +" "+((element['internal_number'] = "null") ? "":element['internal_number']) +" " + element['neighborhood'];
      });
      this.dataSource = new MatTableDataSource<Supplier>(this.suppliers);
    },
    error => {
      console.log(error);
    });
  }

  displayedColumns: string[] = ['name', 'last_name', 'phone', 'email', 'address', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  Buscar(event: Event) {
    const Busqueda = (event.target as HTMLInputElement).value;
    this.dataSource.filter = Busqueda.trim().toLowerCase();
  }

  create() {
    this.router.navigate(['suppliers/create']);
  }

  edit($e) {
    this.router.navigate(['/suppliers/edit', $e.slug]);
  }

  openDialog(element) {
    const dialogRef = this.dialog.open(DialogOverviewDelete, {
      width: '500px',
      data: { title: "Eliminar cliente " + element.email, body: "¿Deseas continuar con la eliminación del cliente?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result == 'Continuar') {
        this._supplierService.delete(this.token, element.slug).subscribe(response => {
          this.date = new Date();
          this.toastr.success(":)", 'Se ha eliminado correctamente');

          this._historyService.create({
            "id_user": this.identity.id,
            "description": "Se ha eliminado un proveedor",
            "date": this.date.getFullYear() + "-" + this.date.getMonth() + "-" + this.date.getDay(),
            "time": this.date.getHours() + ":" + this.date.getMinutes() + ":" + this.date.getSeconds()
          }, this.token).subscribe();

          this._supplierService.getSuppliers(this.token).subscribe(response => {
            this.suppliers = response;
            this.suppliers.forEach(element => {
              element['fullAddress'] = element['street'] + " " + ((element['street2'] = "null") ? " ":element['street2'])+ " #" + element['external_number'] +" "+((element['internal_number'] = "null") ? "":element['internal_number']) +" " + element['neighborhood'];
            });
            this.dataSource = new MatTableDataSource<Supplier>(this.suppliers);
          },
          error => {
            console.log(error);
          });
        });
      }
    });
  }
}
