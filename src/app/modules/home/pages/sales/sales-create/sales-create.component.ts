import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Sale } from 'src/app/shared/models/Sale_model';
import { ClientService } from 'src/app/shared/services/Client_service';

@Component({
  selector: 'app-sales-create',
  templateUrl: './sales-create.component.html',
  styleUrls: ['./sales-create.component.scss'],
  providers: [
    ClientService
  ]
})
export class SalesCreateComponent implements OnInit {
  clients: any;
  token;
  identity;
  sale;

  constructor(
    private router: Router,
    private _clientService: ClientService
  ) { }

  ngOnInit(): void {
    this.sale = new Sale("", null, "", "", "", "", new Date());
    this.identity = JSON.parse(localStorage.getItem('identity'));
    this.token = localStorage.getItem('session');
    this._clientService.getClients(this.token, this.identity.id).subscribe(response => {
      this.clients = response;

      this.clients.forEach(element => {
        element['fullName'] = element['name'] + " " + element['last_name'];
      });
    },
      error => {
        console.log(error);
      });
  }

  addregreso() {
    this.router.navigate(['sales/']);
  }

  ingresaSales() {
  }
  lista: string[] = ["CASH", "CARD"];
  seleccionado = "";


}

