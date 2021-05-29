import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Sale } from 'src/app/shared/models/Sale_model';
import { ClientService } from 'src/app/shared/services/Client_service';
import { ProductService} from 'src/app/shared/services/Product_service';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import { MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-sales-create',
  templateUrl: './sales-create.component.html',
  styleUrls: ['./sales-create.component.scss'],
  providers: [
    ClientService,
    ProductService
  ]
})
export class SalesCreateComponent implements OnInit {
  clients: any;
  products: any;
  token;
  identity;
  sale;
  product: string  = '0';
  verSeleccion: string        = '';
  pro;
  precio;
  subtotal;
  nombre;
  textoDeInput: number = null;
  cantidad;

  constructor(
    private router: Router,
    private _clientService: ClientService,
    private _productService: ProductService
    
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

      this._productService.getProducts(this.token, this.identity.id).subscribe(response => {
        this.products = response;
        this.products.forEach(element => {
          element['fullName'] = element['name'];
        });
      },
        error => {
          console.log(error);
        });

        this.products=this._productService.getProducts(this.token, this.identity.id).subscribe(response => {
          this.products = response;
          this.products.forEach(element => {
            element['fullName'] = element['name'];
          });
        },
        error => {
          console.log(error);
        });

        
  }
  
  capturar() {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.verSeleccion = this.product;
    
  }

  buscaElemento()
  {
    this.pro= this.products.find(elemento=>elemento.fullName === this.verSeleccion);
    
    console.log(this.pro);
    console.log(this.verSeleccion);
    this.cantidad=this.textoDeInput;
    this.subtotal="$"+this.pro.price*this.cantidad;
    this.precio= "$"+this.pro.price+".00";
    this.nombre=this.pro.fullName;
    this.product='0';
    this.textoDeInput=0;

  }

  addregreso() {
    this.router.navigate(['sales/']);
  }


}

