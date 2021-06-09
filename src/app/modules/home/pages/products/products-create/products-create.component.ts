import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/models/Product_model';
import { ProductService } from 'src/app/shared/services/Product_service';

@Component({
  selector: 'app-products-create',
  templateUrl: './products-create.component.html',
  styleUrls: ['./products-create.component.scss'],
  providers: [ProductService, ToastrService],
})

export class ProductsCreateComponent implements OnInit {

  product: Product;
  productSku = null;
  token;
  identity;
  public imagePath;
  imgURL: any;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private toastr: ToastrService, 
    private _productService: ProductService) {
    this.productSku = this.activatedRoute.snapshot.paramMap.get('sku');
  }

  ngOnInit(): void {
    this.identity = JSON.parse(localStorage.getItem('identity'));
    this.token = localStorage.getItem('session');
    this.product = new Product(this.identity.id, "", "", "", "", "", "", "", "");
    console.log(this.product);
  }

  select(event: any){
    let files = [].slice.call(event.target.files);
    var reader = new FileReader();
    this.imagePath = event.target.files[0];
    reader.readAsDataURL(event.target.files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }

  //Funcion para guardar un nuevo producto
  guardarCambios() {
    let storeData: FormData = new FormData();
    storeData.append('user_id', this.product.user_id.toString());
    storeData.append('category',this.product.category);
    storeData.append('cost', this.product.cost);
    storeData.append('description', this.product.description);
    storeData.append('name', this.product.name);
    storeData.append('price', this.product.price);
    storeData.append('slug', this.product.slug);
    storeData.append('stock', this.product.stock);
    storeData.append('photo', this.imagePath, this.imagePath.name);
    
    this._productService.store(this.token, storeData).subscribe(
      response => {
        this.toastr.success("Correcto", 'Se han creado correctamente');
        this.router.navigate(['/products/index']);
      },
      error => {
        this.toastr.error("Error al actualizar,, vuelve a intentarlo más tarde", 'Error');
      }
    )
  }

  regresarIndex() {
    this.router.navigate(['/products/index']);
  }
}

