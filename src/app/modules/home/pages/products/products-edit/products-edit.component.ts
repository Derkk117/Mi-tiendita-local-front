import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
//Se importa el modelo y el servidor de producto
import { Product } from 'src/app/shared/models/Product_model';
import { ProductService } from 'src/app/shared/services/Product_service';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.scss'],
  providers: [ProductService, ToastrService],
})

export class ProductsEditComponent implements OnInit 
{
  productSku = null;
  product: Product;
  token;

  constructor(private activatedRoute: ActivatedRoute, private _productService: ProductService,
    private router: Router,
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

  //Funcion para regresar a la pagina de index
  regresarIndex(){
    this.router.navigate(['/products/index']);
  }

  url: any; 
	msg = "";
	
  //Funcion para seleccionar una imagen 
	selectFile(event: any) 
  { 
		if(!event.target.files[0] || event.target.files[0].length == 0) 
    {
			this.msg = 'Debes de seleccionar una imagen';
			return;
	  }
		
    var mimeType = event.target.files[0].type;
      
    if (mimeType.match(/image\/*/) == null)
    {
        this.msg = "Solo se admiten imágenes";
        return;
    }		
		
    var reader = new FileReader();		
    reader.readAsDataURL(event.target.files[0]);
      
    reader.onload = (_event) =>
    {
        this.msg = "";
        this.url = reader.result; 
    }
	}

}