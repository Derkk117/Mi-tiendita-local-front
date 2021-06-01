import { ToastrService } from 'ngx-toastr';
import { SelectionModel } from '@angular/cdk/collections';
import { ViewChild, Component, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';
import { Delivery } from 'src/app/shared/models/Delivery_model';
import { DeliveryService } from 'src/app/shared/services/Delivery_service';
import { Router } from '@angular/router';
import { MatDialog} from '@angular/material/dialog';
import { DialogOverviewDelete } from 'src/app/shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-deliveries-index',
  templateUrl: './deliveries-index.component.html',
  styleUrls: ['./deliveries-index.component.scss'],

  //Se llama al servidor de producto
  providers: [
    DeliveryService,
    ToastrService
  ]
})


export class DeliveriesIndexComponent implements OnInit {

  token;
  identity;
  deliveries = [];
  dataSource:any;
  pageNumber: any;
  selection = new SelectionModel<Delivery>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = [
    'Sales',
    'place',
    'status',
    'Acciones'
  ];

  constructor(
    private _deliveryService: DeliveryService,
    private router: Router,
    public dialog: MatDialog,
    private toastr: ToastrService,
  ) { }

  ngOnInit(){
    this.identity = JSON.parse(localStorage.getItem('identity'));
    this.token = localStorage.getItem('session');
    this._deliveryService.getDeliveries(this.token, this.identity.id).subscribe(response => {
      this.deliveries = response;
      this.dataSource = new MatTableDataSource<Delivery>(this.deliveries);
      if (this.dataSource != null) {
        console.log(this.dataSource);
        this.dataSource.paginator = this.paginator;
      }
    },
      error => {
        console.log(error);
      });
  }


  //Metodo para buscar dentro de la tabla 
  Buscar(event: Event) {
    const Busqueda = (event.target as HTMLInputElement).value;
    this.dataSource.filter = Busqueda.trim().toLowerCase();
  }

  add(){    
    this.router.navigate(['/deliveries/create']);
  }

  edit(element)
  {
    this.router.navigate(['/deliveries/edit'+ element.sku]);
  }

  goToPage() {
    this.paginator.pageIndex = this.pageNumber, // number of the page you want to jump.
      this.paginator.page.next({
        pageIndex: this.pageNumber,
        pageSize: this.paginator.pageSize,
        length: this.paginator.length
      });
  }

  openDialog(element) {
    const dialogRef = this.dialog.open(DialogOverviewDelete, {
      width: '500px',
      data: { title: "Eliminar entrega " + element.sale_id, body: "¿Deseas continuar con la eliminación de la entrega?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result == 'Continuar') {
        this._deliveryService.delete(this.token, element.sku).subscribe(result => {
          this._deliveryService.getDeliveries(this.token, this.identity.id).subscribe(response => {
            this.deliveries = response;
            this.dataSource = new MatTableDataSource<Delivery>(this.deliveries);
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

