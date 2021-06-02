import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Delivery } from 'src/app/shared/models/Delivery_model';
import { DeliveryService } from 'src/app/shared/services/Delivery_service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-deliveries-edit',
  templateUrl: './deliveries-edit.component.html',
  styleUrls: ['./deliveries-edit.component.scss'],
  providers: [
    DeliveryService,
    ToastrService,
  ]
  
})
export class DeliveriesEditComponent implements OnInit {

  deliverySku = null;
  delivery: Delivery;
  token;
  
  constructor(
    private activatedRoute: ActivatedRoute, 
    private _deliveryService: DeliveryService,
    private router: Router,
    private toastr: ToastrService,
    ) 
  {
    this.deliverySku = this.activatedRoute.snapshot.paramMap.get('sku');
  }  

  ngOnInit(): void 
  {
    this.token = localStorage.getItem('session');
    if(this.deliverySku && this.token != null)
    {
      this._deliveryService.getDelivery(this.token, this.deliverySku).subscribe(response=>{
        this.delivery = response;
        console.log(this.delivery);
        console.log(this.deliverySku);
      },
      
      error =>{
        console.log(error)
      });
    }    
  }

  save(){
    this._deliveryService.update(this.token, this.deliverySku, this.delivery).subscribe(
      response =>{
        this.toastr.success(":)", 'Se han guardado los cambios correctamente');
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