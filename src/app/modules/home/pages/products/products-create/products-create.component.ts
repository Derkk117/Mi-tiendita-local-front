import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
//Se importa el modelo y el servidor de producto
import { Product } from 'src/app/shared/models/Product_model';
import { ProductService } from 'src/app/shared/services/Product_service';

@Component({
  selector: 'app-products-create',
  templateUrl: './products-create.component.html',
  styleUrls: ['./products-create.component.scss'],
  providers: [ProductService, 
    ToastrService],  
})

export class ProductsCreateComponent implements OnInit 
{
  product: Product;
  token;  
  identity;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private _productService: ProductService
  ) {
  }
  
  ngOnInit(): void {
    this.product = new Product(null,"",null,"","","",null,"",""); //Intialize new client
    this.identity = JSON.parse(localStorage.getItem('identity'));
    this.token = localStorage.getItem('session');
    
  }

  save(){
    console.log(this.product);
    this._productService.store(this.token, this.product, this.identity.id).subscribe(
      response =>{

        this.toastr.success(":)", 'Se han creado correctamente');
        this.router.navigate(['/products/index']);
      },
      error =>{
        this.toastr.error("Error al actualizar,, vuelve a intentarlo más tarde", 'Error');     
      }
    )
  }

  goBack(){
    this.router.navigate(['/products/index']);
  }
}

