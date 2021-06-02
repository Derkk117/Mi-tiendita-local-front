// import { ToastrService } from 'ngx-toastr';
// import { Component, OnInit,  ViewChild, ElementRef } from '@angular/core';
// import { Router } from '@angular/router';
// import { Delivery } from '../../../../../shared/models/Delivery_model';
// import { DeliveryService } from 'src/app/shared/services/Delivery_service';
// import { SaleService } from 'src/app/shared/services/Sale_service';

// @Component({
//   selector: 'app-deliveries-create',
//   templateUrl: './deliveries-create.component.html',
//   styleUrls: ['./deliveries-create.component.scss'],
//   providers: [
//     SaleService,
//     DeliveryService,
//     ToastrService,
//   ]
// })
// export class DeliveriesCreateComponent implements OnInit {
//   sales: any;
//   delivery: Delivery;
//   token;
//   identity;


//   constructor(
//     private router: Router,
//     private _saleService: SaleService,
//     private _deliveryService: DeliveryService,
//     private toastr: ToastrService,
//   ) {}

//   ngOnInit(): void {
//     this.delivery = new Delivery("", "", "","");
//     this.identity = JSON.parse(localStorage.getItem('identity'));
//     this.token = localStorage.getItem('session');
//     this._saleService.getSales(this.token, this.identity.id).subscribe(response => {
//       this.sales = response;
//       this.sales.forEach(element => {
//         element['fullName'] =  "Folio: " + element['sku'];
//       });
//     },
//       error => {
//         console.log(error);
//       });

//   }

//   save(){
//     console.log(this.delivery);
//     console.log(this.token);
//     if(this.delivery.place != "" && this.delivery.status)
//         {
//         this._deliveryService.create(this.delivery,this.token).subscribe(

//         )
//     }
//   }
  	
//   goBack(){
//     this.router.navigate(['deliveries/']);
//   }
// }

import { ToastrService } from 'ngx-toastr';
import { Component, OnInit,  ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Delivery } from '../../../../../shared/models/Delivery_model';
import { DeliveryService } from 'src/app/shared/services/Delivery_service';
import { SaleService } from 'src/app/shared/services/Sale_service';

@Component({
  selector: 'app-deliveries-create',
  templateUrl: './deliveries-create.component.html',
  styleUrls: ['./deliveries-create.component.scss'],
  providers: [
    SaleService,
    DeliveryService,
    ToastrService
  ]
})
export class DeliveriesCreateComponent implements OnInit {
 
  sales: any;
  delivery: Delivery;
  token;
  identity;
  saleSku = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _saleService: SaleService,
    private _deliveryService: DeliveryService,
    private toastr: ToastrService
  ) {
    //this.deliverySku = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.identity = JSON.parse(localStorage.getItem('identity'));
    this.token = localStorage.getItem('session');
    this.delivery = new Delivery(null,"","","");
    this._saleService.getSales(this.token, this.identity.id).subscribe(response => {
      this.sales = response;
      
      this.sales.forEach(element => {
        element['fullName'] =  "Folio: " + element['sku'];
        
      });
      
    },
    
      error => {
        console.log(error);
      });
      
  }

  save(){
    console.log(this.delivery);
    this._deliveryService.create(this.delivery, this.token).subscribe(
      
      response =>{

        this.toastr.success(":)", 'Se ha creado correctamente');
        this.router.navigate(['/deliveries/index']);
      },
      error =>{
        this.toastr.error("Error al actualizar, vuelve a intentarlo más tarde", 'Error');     
      }
    )
  }
  	
  goBack(){
    this.router.navigate(['/deliveries/index']);
  }
}