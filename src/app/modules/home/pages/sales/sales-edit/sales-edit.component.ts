import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sale } from '../../../../../shared/models/Sale_model';
import { SaleService } from 'src/app/shared/services/Sale_service';

@Component({
  selector: 'app-sales-edit',
  templateUrl: './sales-edit.component.html',
  styleUrls: ['./sales-edit.component.scss'],
  providers: [
    SaleService,
    ToastrService,
  ]
})
export class SalesEditComponent implements OnInit {
  saleSku = null;
  sale: Sale;
  token
  constructor(
    private activatedRoute: ActivatedRoute,
    private _saleService: SaleService,
    private router: Router,
    private toastr: ToastrService
  )  {this.saleSku = this.activatedRoute.snapshot.paramMap.get('sku'); }

  ngOnInit(): void {
    this.token = localStorage.getItem('session');
    if(this.saleSku && this.token != null){
      this._saleService.getSale(this.token, this.saleSku).subscribe(response=>{
        this.sale = response;
        console.log(this.sale);
      },
      error =>{
        console.log(error)
      });
    }    
  }

  save(){
    this._saleService.update(this.token, this.saleSku, this.sale).subscribe(
      response =>{
        this.toastr.success(":)", 'Se han guardado los cambios correctamente');
        this.router.navigate(['/sales/index']);
      },
      error =>{
        this.toastr.error("Error al actualizar, vuelve a intentarlo más tarde", 'Error');     
      }
    )
  }

}
