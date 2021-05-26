import { Component, OnInit } from '@angular/core';
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
  productSku = null;
  product: Product;
  token;  

  constructor(private activatedRoute: ActivatedRoute, 
    private _productService: ProductService,  private router: Router,
    private toastr: ToastrService) 
  {
    this.productSku = this.activatedRoute.snapshot.paramMap.get('sku');
  }  

  ngOnInit(): void 
  {
    this.token = localStorage.getItem('session');
    if(this.productSku && this.token != null)
    {
      this._productService.getProduct(this.token, this.productSku).subscribe(response=>{
        this.product = response;
        console.log(this.product);
      },
      error =>{
        console.log(error)
      });
    }    
  }  

  regresarIndex(){
    this.router.navigate(['/products/index']);
  }
} 

