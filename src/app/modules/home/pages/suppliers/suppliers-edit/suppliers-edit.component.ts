import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Supplier } from 'src/app/shared/models/Supplier_model';
import { SupplierService } from 'src/app/shared/services/Supplier_service';

@Component({
  selector: 'app-suppliers-edit',
  templateUrl: './suppliers-edit.component.html',
  styleUrls: ['./suppliers-edit.component.scss'],
  providers: [SupplierService]
})
export class SuppliersEditComponent implements OnInit {

  supplierSlug =null;
  supplier;
  token; 
  constructor( private activatedRoute: ActivatedRoute,
    private _supplierService: SupplierService
  ) { 
    this.supplierSlug = this.activatedRoute.snapshot.paramMap.get('slug');
  }

  ngOnInit(): void {
    console.log(this.supplierSlug);

    this.token = localStorage.getItem('session');
    if(this.supplierSlug && this.token != null){
      this._supplierService.getSupplier(this.token, this.supplierSlug).subscribe(response=>{
        this.supplier = response;
        console.log(this.supplier);
      },
      error =>{
        console.log(error)
      });
    }    
  }

  lista:string[]=["address 1", "address2"];
  seleccionado = "";

}
