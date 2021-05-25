import { SelectionModel } from '@angular/cdk/collections';
import { ViewChild, Component, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';
import { Delivery } from 'src/app/shared/models/Delivery_model';
import { DeliveryService } from 'src/app/shared/services/Delivery_service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deliveries-index',
  templateUrl: './deliveries-index.component.html',
  styleUrls: ['./deliveries-index.component.scss'],

  //Se llama al servidor de producto
  providers: [DeliveryService]
})


export class DeliveriesIndexComponent implements OnInit {

  token;
  identity;
  deliveries = [];
  dataSource:any;
  selection = new SelectionModel<Delivery>(true, []);

  constructor(private deliveryService: DeliveryService,private router: Router,) 
  { 
  }

  ngOnInit(){
    this.identity = JSON.parse(localStorage.getItem('identity'));
    this.token = localStorage.getItem('session');
    this.deliveryService.getDeliveries(this.token, this.identity.id).subscribe(response => {
      this.deliveries = response;
      this.dataSource = new MatTableDataSource<Delivery>(this.deliveries);
    },
      error => {
        console.log(error);
      });
  }

  displayedColumns: string[] = ['place','status','Acciones'];

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
    this.router.navigate(['deliveries/create/']);
  }

  edit(element)
  {
    this.router.navigate(['deliveries/edit/'+ element.sku]);
  }
}
