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
  providers: [ProductService, ToastrService],  
})

export class ProductsCreateComponent implements OnInit 
{

  product: Product;
  productSku = null;
  public imagePath;
  imgURL: any;
  token;  
  identity;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private toastr: ToastrService, private _productService: ProductService) 
  {
    this.productSku = this.activatedRoute.snapshot.paramMap.get('sku');
  }
  
  ngOnInit(): void 
  {
    this.token = localStorage.getItem('session');
    this.product = new Product(null,"","","","","","","","");   
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

  //Funcion para seleccionar una imagen 
  seleccionaImagen(event: any){
    let files = [].slice.call(event.target.files);
    var reader = new FileReader();
    this.imagePath = event.target.files[0];
    reader.readAsDataURL(event.target.files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }
  
  //Funcion para guardar un nuevo producto
  guardarCambios(){
    this._productService.store(this.token, this.product).subscribe(
      response =>{
        this.toastr.success("Correcto", 'Se han creado correctamente');
        this.router.navigate(['/products/index']);
      },
      error =>{
        this.toastr.error("Error al actualizar,, vuelve a intentarlo más tarde", 'Error');     
      }
    )
  }

  regresarIndex(){
    this.router.navigate(['/products/index']);
  }
}

