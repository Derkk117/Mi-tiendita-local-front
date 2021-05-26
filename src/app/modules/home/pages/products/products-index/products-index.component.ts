import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { ViewChild, Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewDelete } from 'src/app/shared/delete-dialog/delete-dialog.component';

//Se importa el modelo y el servidor de producto
import { Product } from 'src/app/shared/models/Product_model';
import { ProductService } from 'src/app/shared/services/Product_service';


@Component({
  selector: 'app-products-index',
  templateUrl: './products-index.component.html',
  styleUrls: ['./products-index.component.scss'],
  //Se llama al servidor de producto
  providers: [ProductService, ToastrService]
})

export class ProductsIndexComponent implements OnInit {

  token;
  identity;
  //Se declara un arreglo de productos
  products = [];
  dataSource:any;  
  pageNumber: any;
  selection = new SelectionModel<Product>(true, []);  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = 
  [
    'name','description','price',
    'cost','stock','image','category','Acciones'
  ];

  constructor(private productoService: ProductService, private router: Router,
    private toastr: ToastrService, 
    public dialog: MatDialog,) 
  {}

  ngOnInit() {
    this.identity = JSON.parse(localStorage.getItem('identity'));
    this.token = localStorage.getItem('session');
    this.productoService.getProducts(this.token, this.identity.id).subscribe(response => {
      this.products = response;
      this.dataSource = new MatTableDataSource<Product>(this.products);
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

  //Funcion para ir a la pagina de Editar
  edit(element){
    this.router.navigate(['products/edit/'+ element.sku]);
  }

  //Funcion para ir a la pagina de agregar
  add(){    
    this.router.navigate(['products/create/']);
  }

  goToPage() {
    this.paginator.pageIndex = this.pageNumber, 
      this.paginator.page.next({
        pageIndex: this.pageNumber,
        pageSize: this.paginator.pageSize,
        length: this.paginator.length
      });
  }

  //Funcion de desplegar un cuadro de dialogo para eliminar y guardar cambios 
  cuadroDialogo(element): void {
    const dialogRef = this.dialog.open(DialogOverviewDelete, 
      {
        width: '500px',
        data: 
        { 
          title: "Eliminar producto " + element.id, 
          body: "¿Seguro de eliminar el producto?" 
        }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result == 'Continuar') 
      {
        this.productoService.delete(this.token, element.sku).subscribe(result => {
          this.productoService.getProducts(this.token, this.identity.id).subscribe(response => 
            {
            this.products = response;
            this.dataSource = new MatTableDataSource<Product>(this.products);
          },
          error => {
            console.log(error);
          });
          this.toastr.success(":)", 'Se han guardado los cambios correctamente');
        },
        error => {
            this.toastr.error("Error al actualizar, vuelve a intentarlo", 'Error');
          });
      }
    });
  }
}