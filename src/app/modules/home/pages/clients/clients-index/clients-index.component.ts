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

  constructor(
    private _clientService: ClientService
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

  displayedColumns: string[] = [
    'name', 
    'last_name', 
    'email',
    'payment_method', 
    'phone', 
    'client_type',
    'actions'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  Buscar(event: Event) {
    const Busqueda = (event.target as HTMLInputElement).value;
    this.dataSource.filter = Busqueda.trim().toLowerCase();
  }

  // changeLabelFromTable(){
  //   var div = <HTMLInputElement>document.getElementById("mat-paginator-page-size-label");
  //   div.textContent = "Elementos por página: ";
  // }
}
