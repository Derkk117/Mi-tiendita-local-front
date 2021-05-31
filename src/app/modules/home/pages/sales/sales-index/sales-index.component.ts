import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';
import { Sale } from 'src/app/shared/models/Sale_model';
import { SaleService } from 'src/app/shared/services/Sale_service';
import { Router } from '@angular/router';
import { DialogOverviewDelete } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-sales-index',
  templateUrl: './sales-index.component.html',
  styleUrls: ['./sales-index.component.scss'],
   //Se llama al servidor de producto
   providers: [
     SaleService,
    ToastrService]
})

export class SalesIndexComponent implements OnInit {

  token;
  identity;
  //Se declara un arreglo de ventas
  ventas = [];
  dataSource:any;
  selection = new SelectionModel<Sale>(true, []);

  constructor(private ventaService: SaleService,
    private router: Router,
    public dialog: MatDialog,
    private toastr: ToastrService,) 
  {}

  ngOnInit() {
    this.identity = JSON.parse(localStorage.getItem('identity'));
    this.token = localStorage.getItem('session');
    this.ventaService.getSales(this.token, this.identity.id).subscribe(response => {
      this.ventas = response;
      this.dataSource = new MatTableDataSource<Sale>(this.ventas);
    },
      error => {
        console.log(error);
      });
  }

  displayedColumns: string[] = ['client_id','payment_method','Card_Number','Card_cvc','expiration','Acciones'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  //Metodo de las paginas de las tabla que tiene
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  //Metodo para buscar dentro de la tabla 
  Buscar(event: Event) {
    const Busqueda = (event.target as HTMLInputElement).value;
    this.dataSource.filter = Busqueda.trim().toLowerCase();
  }

  add(){    
    this.router.navigate(['sales/create/']);
  }

  edit(element)
  {
    this.router.navigate(['/sales/edit', element.sku]);
  }

  openDialog(element): void {
    const dialogRef = this.dialog.open(DialogOverviewDelete, {
      width: '500px',
      data: { title: "Eliminar venta " + element.sku, body: "¿Deseas continuar con la eliminación de la venta?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result == 'Continuar') {
        this.ventaService.delete(this.token, element.sku).subscribe(result => {
          this.ventaService.getSales(this.token, this.identity.id).subscribe(response => {
            this.ventas = response;
            this.dataSource = new MatTableDataSource<Sale>(this.ventas);
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