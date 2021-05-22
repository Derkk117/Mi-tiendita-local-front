import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { ViewChild, Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';

//Se importa el modelo y el servidor de producto
import { Product } from 'src/app/shared/models/Product_model';
import { ProductService } from 'src/app/shared/services/Product_service';

@Component({
  selector: 'app-products-index',
  templateUrl: './products-index.component.html',
  styleUrls: ['./products-index.component.scss'],
  //Se llama al servidor de producto
  providers: [ProductService]
})

export class ProductsIndexComponent implements OnInit {

  token;
  identity;
  //Se declara un arreglo de productos
  products = [];
  dataSource:any;
  selection = new SelectionModel<Product>(true, []);

  displayedColumns: string[] = 
  [
    'name','description','price',
    'cost','stock','image','category','Acciones'
  ];

  constructor(private productoService: ProductService, private router: Router,) 
  {}

  ngOnInit() {
    this.identity = JSON.parse(localStorage.getItem('identity'));
    this.token = localStorage.getItem('session');
    this.productoService.getProducts(this.token, this.identity.id).subscribe(response => {
      this.products = response;
      this.dataSource = new MatTableDataSource<Product>(this.products);
    },
      error => {
        console.log(error);
      });
  } 
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  //Metodo de las paginas de las tabla que tiene
  ngAfterViewInit() 
  {
   if(this.dataSource != null) 
    this.dataSource.paginator = this.paginator;
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

  //Funcion para ir a la pagina de regresar
  regresar(){    
    this.router.navigate(['products/index/']);
  }
}