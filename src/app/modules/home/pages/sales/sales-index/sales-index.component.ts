import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table'
import { Sale } from 'src/app/shared/models/Sale_model';
import { SaleService } from 'src/app/shared/services/Sale_service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales-index',
  templateUrl: './sales-index.component.html',
  styleUrls: ['./sales-index.component.scss'],
   //Se llama al servidor de producto
   providers: [SaleService]
})

export class SalesIndexComponent implements OnInit {

  token;
  identity;
  //Se declara un arreglo de ventas
  ventas = [];
  dataSource:any;
  selection = new SelectionModel<Sale>(true, []);

  constructor(private ventaService: SaleService,private router: Router,) 
  {}

  ngOnInit() {
    this.identity = JSON.parse(localStorage.getItem('identity'));
    this.token = localStorage.getItem('session');
    this.ventaService.getProducts(this.token, this.identity.id).subscribe(response => {
      this.ventas = response;
      this.dataSource = new MatTableDataSource<Sale>(this.ventas);
    },
      error => {
        console.log(error);
      });
  }

  displayedColumns: string[] = ['Products','payment_method','Card_Number','Card_cvc','expiration','Acciones'];

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
}