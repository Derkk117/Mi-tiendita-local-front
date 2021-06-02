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
import { HistoryService } from 'src/app/shared/services/History_service';


@Component({
  selector: 'app-sales-create',
  templateUrl: './sales-create.component.html',
  styleUrls: ['./sales-create.component.scss'],
  providers: [
    ClientService,
    ProductService,
    ToastrService,
    SaleService,
    HistoryService
  ]
})
export class SalesCreateComponent implements OnInit {
  token;
  identity;
  sale;
  clients;
  products;
  product;
  quantity = 0;
  productsList = [];
  total = 0;
  dataProducts;
  date;
  history;

  displayedColumns: string[] = ['cantidad','products','price','subtotal', 'actions'];

  constructor(
    private router: Router,
    private _clientService: ClientService,
    private _productService: ProductService,
    private _saleService: SaleService,
    private toastr: ToastrService,
    private _historyService: HistoryService,
  ) { }

  ngOnInit(): void {
    this.sale = new Sale("", null, "", "", "", "", "");

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
  }

  addProduct(){
    this.productsList.push({
      sku: this.products[this.product].sku,
      name: this.products[this.product].name,
      qty: this.quantity,
      price: this.products[this.product].price,
      subtotal: this.quantity * this.products[this.product].price
    });

    this.total = 0;
    this.productsList.forEach(element => {
      this.total += element.qty * element.price;
    });
    this.dataProducts = new MatTableDataSource<Product>(this.productsList);
  }

  goBack() {
    this.router.navigate(['sales/']);
  }

  deleteProduct(ele){
    for(let i = 0; i < this.productsList.length; i++){
      if(this.productsList[i].sku == ele.sku) {
        this.productsList.splice(i,1);
        break;
      }
    }

    this.total = 0;
    this.productsList.forEach(element => {
      this.total += element.qty * element.price;
    });
    this.dataProducts = new MatTableDataSource<Product>(this.productsList);
  }

  save(){
    this.sale.products = JSON.stringify(this.productsList);
    this._saleService.store(this.token, this.sale, this.identity.id).subscribe(
          response =>{
            this.date = new Date();
            this.history = 
            { 
              "id_user": this.identity.id, 
              "description": "Registro de sale",
              "date": this.date.getFullYear() +"-"+ (this.date.getMonth()+1) +"-"+this.date.getDate(),
              "time": this.date.getHours() +":"+this.date.getMinutes()+":"+this.date.getSeconds()
            };
            this._historyService.create(this.history,this.token).subscribe();
    
            this.toastr.success(":)", 'Se han creado correctamente');
            this.router.navigate(['/sales/index']);
          },
          error =>{
            this.toastr.error("Error al actualizar, vuelve a intentarlo más tarde", 'Error');     
          }
        )
  }

  // history = {};
  // date = new Date();
  // clients: any;
  // products: any;
  // token;
  // identity;
  // sale;
  // product: string  = '0';
  // verSeleccion: string        = '';
  // pro;
  // textoDeInput: number = null;
  // productos=[];
  // dataProduct:any;
  // total: number=0;
  // listProducts: string='';

  // constructor(
  //   private router: Router,
  //   private _clientService: ClientService,
  //   private _productService: ProductService,
  //   private _saleService: SaleService,
  //   private toastr: ToastrService,
  //   private _historyService: HistoryService,
  // ) { }

  // ngOnInit(): void {
  //   this.sale = new Sale("", null, "", "", "", "", "");
  //   this.identity = JSON.parse(localStorage.getItem('identity'));
  //   this.token = localStorage.getItem('session');
  //   this._clientService.getClients(this.token, this.identity.id).subscribe(response => {
  //     this.clients = response;

  //     this.clients.forEach(element => {
  //       element['fullName'] = element['name'] + " " + element['last_name'];
  //     });
  //   },
  //     error => {
  //       console.log(error);
  //     });

  //     this._productService.getProducts(this.token, this.identity.id).subscribe(response => {
  //       this.products = response;
  //       this.products.forEach(element => {
  //         element['fullName'] = element['name'];
  //       });
  //     },
  //       error => {
  //         console.log(error);
  //       });

  //       this.products=this._productService.getProducts(this.token, this.identity.id).subscribe(response => {
  //         this.products = response;
  //         this.products.forEach(element => {
  //           element['fullName'] = element['name'];
  //         });
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }
  // displayedColumns: string[] = ['cantidad','products','price','subtotal'];

  // capturar() {
  //   // Pasamos el valor seleccionado a la variable verSeleccion
  //   this.verSeleccion = this.product;
    
  // }

  // buscaElemento()
  // {
  //   this.pro= this.products.find(elemento=>elemento.fullName === this.verSeleccion);
  //   this.pro['subtotal']=this.pro.price*this.textoDeInput;
  //   this.pro['cantidad']=this.textoDeInput;
  //   console.log(this.pro.stock);
  //   if(parseInt(this.pro.cantidad) <= parseInt(this.pro.stock)){
  //     this.productos.push(this.pro);
  //     this.product='0';
  //     this.textoDeInput=0;
  //     this.dataProduct = new MatTableDataSource<Product>(this.productos);
  //     this.total+=this.pro.subtotal;
	// 	}else {
	// 		alert("No tenemos la cantidad suficiente, contamos con "+this.pro.stock+ " piezas");
	// 	}
  // }

  // save(){
  //   console.log(this.sale);
  //   console.log(this.dataProduct);
  //   this.productos.forEach(element => {
  //     this.listProducts+=element.name+"\n";
  //   });
  //   this.sale.products=this.listProducts;
  //   console.log(this.sale);
  //   this._saleService.store(this.token, this.sale, this.identity.id).subscribe(
  //     response =>{

  //       this.date = new Date();
        
  //       this.history = 
  //       { 
  //         "id_user": this.identity.id, 
  //         "description": "Registro de sale",
  //         "date": this.date.getFullYear() +"-"+ (this.date.getMonth()+1) +"-"+this.date.getDate(),
  //         "time": this.date.getHours() +":"+this.date.getMinutes()+":"+this.date.getSeconds()
  //       };
  //       this._historyService.create(this.history,this.token).subscribe();

  //       this.toastr.success(":)", 'Se han creado correctamente');
  //       this.router.navigate(['/sales/index']);
  //     },
  //     error =>{
  //       this.toastr.error("Error al actualizar, vuelve a intentarlo más tarde", 'Error');     
  //     }
  //   )
  // }
  // addregreso() {
  //   this.router.navigate(['sales/']);
  // }
}

