import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from '../../../../../shared/models/Client_model';
import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { ClientService } from 'src/app/shared/services/Client_service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogOverviewDelete } from 'src/app/shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-clients-index',
  templateUrl: './clients-index.component.html',
  styleUrls: ['./clients-index.component.scss'],
  providers: [
    ClientService,
    ToastrService,
  ]
})

export class ClientsIndexComponent implements OnInit {
  token;
  identity;
  clients = [];
  dataSource: any;
  pageNumber: any;
  selection = new SelectionModel<Client>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = [
    'name',
    'last_name',
    'email',
    'payment_method',
    'phone',
    'client_type',
    'actions'
  ];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private _clientService: ClientService,
  ) {
  }

  ngOnInit() {
    this.identity = JSON.parse(localStorage.getItem('identity'));
    this.token = localStorage.getItem('session');
    this._clientService.getClients(this.token, this.identity.id).subscribe(response => {
      this.clients = response;
      this.dataSource = new MatTableDataSource<Client>(this.clients);
      if (this.dataSource != null) {
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator._intl.itemsPerPageLabel="Elementos por pagina";
      }
    },
      error => {
        console.log(error);
      });
  }

  Buscar(event: Event) {
    const Busqueda = (event.target as HTMLInputElement).value;
    this.dataSource.filter = Busqueda.trim().toLowerCase();
  }

  edit(element) {
    this.router.navigate(['/clients/edit', element.sku]);
  }

  add(){
    this.router.navigate(['/clients/store']);
  }

  goToPage() {
    this.paginator.pageIndex = this.pageNumber, // number of the page you want to jump.
      this.paginator.page.next({
        pageIndex: this.pageNumber,
        pageSize: this.paginator.pageSize,
        length: this.paginator.length
      });
  }

  openDialog(element): void {
    const dialogRef = this.dialog.open(DialogOverviewDelete, {
      width: '500px',
      data: { title: "Eliminar cliente " + element.email, body: "¿Deseas continuar con la eliminación del cliente?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result == 'Continuar') {
        this._clientService.delete(this.token, element.sku).subscribe(result => {
          this._clientService.getClients(this.token, this.identity.id).subscribe(response => {
            this.clients = response;
            this.dataSource = new MatTableDataSource<Client>(this.clients);
          },
          error => {
            console.log(error);
          });
          this.toastr.success(":)", 'Se han guardado los cambios correctamente');
        },
        error => {
            this.toastr.error("Error al actualizar, vuelve a intentarlo más tarde", 'Error');
          });
      }
    });
  }
}