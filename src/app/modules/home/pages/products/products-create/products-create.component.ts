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
  productSku = null;
  public product: Product;
  public imagePath;
  imgURL: any;
  token;  

  constructor(private activatedRoute: ActivatedRoute, 
    private _productService: ProductService,  
    private router: Router,
    private toastr: ToastrService) 
  {
    this.productSku = this.activatedRoute.snapshot.paramMap.get('sku');
  }  

  ngOnInit(): void 
  {
    this.product = new Product(null, "","","","","","","","");
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

	url: any; 
	msg = "";
  public lastPK: number;
	
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

  //Para guardar cambios de un nuevo producto
  guardarCambios()
  {
    this._productService.create(this.token, this.product).subscribe(Response => {
        this.toastr.success("Correcto", 'Se ha creado correctamente el producto');
        this.router.navigate(['/products/index']);
      },
      error =>{
        this.toastr.error("Error al guardar, vuelve a intentarlo más tarde", 'Error');     
      }
    );
  }
} 

