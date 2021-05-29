import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Sale } from 'src/app/shared/models/Sale_model';
import { ClientService } from 'src/app/shared/services/Client_service';
import { ProductService} from 'src/app/shared/services/Product_service';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import { MatLabel } from '@angular/material/form-field';
import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource} from '@angular/material/table'
import { Product } from 'src/app/shared/models/Product_model';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { SaleService } from 'src/app/shared/services/Sale_service';
import { DialogOverviewDelete } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { ToastrService } from 'ngx-toastr';

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
  textoDeInput: number = null;
  productos=[];
  dataProduct:any;

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
  displayedColumns: string[] = ['cantidad','products','price','subtotal'];

  capturar() {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.verSeleccion = this.product;
    
  }

  buscaElemento()
  {
    this.pro= this.products.find(elemento=>elemento.fullName === this.verSeleccion);
    this.pro['subtotal']=this.pro.price*this.textoDeInput;
    this.pro['cantidad']=this.textoDeInput;
    console.log(this.pro.stock);
    if(parseInt(this.pro.cantidad) <= parseInt(this.pro.stock)){
      this.productos.push(this.pro);
      this.product='0';
      this.textoDeInput=0;
      this.dataProduct = new MatTableDataSource<Product>(this.productos);
		}else {
			alert("No tenemos la cantidad suficiente, contamos con "+this.pro.stock+ " piezas");
		}
    
    
   
  }

  addregreso() {
    this.router.navigate(['sales/']);
  }


}

