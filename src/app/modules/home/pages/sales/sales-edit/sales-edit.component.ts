import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sale } from '../../../../../shared/models/Sale_model';
import { SaleService } from 'src/app/shared/services/Sale_service';
import { ClientService } from 'src/app/shared/services/Client_service';

@Component({
  selector: 'app-sales-edit',
  templateUrl: './sales-edit.component.html',
  styleUrls: ['./sales-edit.component.scss'],
  providers: [
    SaleService,
    ToastrService,
    ClientService
  ]
})
export class SalesEditComponent implements OnInit {
  saleSku = null;
  sale: Sale;
  token
  products;
  cli;
  dataProducts=[];
  displayedColumns: string[] = ['cantidad','products','price','subtotal'];
  total=0;
  fecha;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _saleService: SaleService,
    private router: Router,
    private _clientService: ClientService,
    private toastr: ToastrService
   
  )  {this.saleSku = this.activatedRoute.snapshot.paramMap.get('sku'); }

  ngOnInit(): void {
    this.token = localStorage.getItem('session');
    if(this.saleSku && this.token != null){
      this._saleService.getSale(this.token, this.saleSku).subscribe(response=>{
        this.sale = response;
        this.products=JSON.parse(this.sale.products);
        this._clientService.getClient(this.token,this.sale.client_id).subscribe(response=>{
          this.cli=response;
          this.products.forEach(element => {
            var subtotal;
            subtotal=Number(element.subtotal);
            this.total+=subtotal;
          });
          
        },
        error =>{
          console.log(error);
        })
        
      },
      error =>{
        console.log(error)
      });
     
    }   
    
  }

  

  goBack(){
    this.router.navigate(['/sales/index']);
  }

}
