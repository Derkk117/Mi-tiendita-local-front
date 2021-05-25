import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Delivery } from 'src/app/shared/models/Delivery_model';
import { DeliveryService } from 'src/app/shared/services/Delivery_service';

@Component({
  selector: 'app-deliveries-edit',
  templateUrl: './deliveries-edit.component.html',
  styleUrls: ['./deliveries-edit.component.scss'],
  providers: [DeliveryService],
  
})
export class DeliveriesEditComponent implements OnInit {

  deliverySku = null;
  delivery: Delivery;
  token;



  
  constructor(private activatedRoute: ActivatedRoute, private _deliveryService: DeliveryService) 
  {
    this.deliverySku = this.activatedRoute.snapshot.paramMap.get('sku');
  }  

  ngOnInit(): void 
  {
    this.token = localStorage.getItem('session');
    if(this.deliverySku && this.token != null)
    {
      this._deliveryService.getDeliveries(this.token, this.deliverySku).subscribe(response=>{
        this.delivery = response;
        console.log(this.delivery);
      },
      error =>{
        console.log(error)
      });
    }    
  }

}