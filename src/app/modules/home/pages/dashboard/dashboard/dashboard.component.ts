// import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateStoreDialogComponent } from 'src/app/shared/create-store-dialog/create-store-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  identity;
  store;

  constructor(
    public dialog: MatDialog,
    // private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.store = (localStorage.getItem('store')) ? JSON.parse(localStorage.getItem('store')) : null;
    this.identity = JSON.parse(localStorage.getItem('identity'));
    if(this.store == null){
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
      if (result != undefined && result == 'Continuar') {
        // this._clientService.delete(this.token, element.sku).subscribe(result => {
        //   this._clientService.getClients(this.token, this.identity.id).subscribe(response => {
        //     this.clients = response;
        //     this.dataSource = new MatTableDataSource<Client>(this.clients);
        //   },
        //   error => {
        //     console.log(error);
        //   });
        //   this.toastr.success(":)", 'Se han guardado los cambios correctamente');
        // },
        // error => {
        //     this.toastr.error("Error al actualizar, vuelve a intentarlo más tarde", 'Error');
        //   });
      }
    });
  }
}