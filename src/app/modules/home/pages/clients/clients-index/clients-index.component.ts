import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'
import { Component, ViewChild, OnInit } from '@angular/core';
import { Client } from '../../../../../shared/models/Client_model';
import { ClientService } from 'src/app/shared/services/Client_service';

@Component({
  selector: 'app-clients-index',
  templateUrl: './clients-index.component.html',
  styleUrls: ['./clients-index.component.scss'],
  providers: [ClientService]
})

export class ClientsIndexComponent implements OnInit {
  token;
  identity;
  clients = [];
  dataSource:any;
  selection = new SelectionModel<Client>(true, []);

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
    private _clientService: ClientService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.identity = JSON.parse(localStorage.getItem('identity'));
    this.token = localStorage.getItem('session');
    this._clientService.getClients(this.token, this.identity.id).subscribe(response => {
      this.clients = response;
      this.dataSource = new MatTableDataSource<Client>(this.clients);
    },
      error => {
        console.log(error);
      });
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    if(this.dataSource != null) this.dataSource.paginator = this.paginator;
  }

  Buscar(event: Event) {
    const Busqueda = (event.target as HTMLInputElement).value;
    this.dataSource.filter = Busqueda.trim().toLowerCase();
  }

  edit(element){
    this.router.navigate(['/clients/edit', element.sku]);
  }
}
