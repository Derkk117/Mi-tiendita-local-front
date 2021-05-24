
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { Supplier} from '../../../../../shared/models/Supplier_model';
import { Address} from '../../../../../shared/models/Address_model';
import { SupplierService} from '../../../../../shared/services/Supplier_service';
import { AddressService} from '../../../../../shared/services/Address_service';


@Component({
  selector: 'app-suppliers-index',
  templateUrl: './suppliers-index.component.html',
  styleUrls: ['./suppliers-index.component.scss'],
  providers: [AddressService, SupplierService]
})

export class SuppliersIndexComponent implements OnInit {

  token;
  identity;
  suppliers = [];
  address = [];
  dataSource:any;
  selection = new SelectionModel<Supplier>(true, []);

  constructor(
    private router: Router,
    private _addressService: AddressService,
    private _supplierService: SupplierService,
    ) {}

  ngOnInit() {
    this.identity = JSON.parse(localStorage.getItem('identity'));
    this.token = localStorage.getItem('session');
    this._supplierService.getSuppliers(this.token).subscribe(response => {
      this.suppliers = response;
      console.log(response);
      this.suppliers.forEach(element => {
          this._addressService.getAddress(element.address, this.token).subscribe( response => {

            element["address"] = response["street"] + " #" + response["external_number"] + " " + response["neighborhood"];
          },
        )
      });

      ///Necesitaba esperar una respuesta para que no se actualizara despues la direccion
      this._addressService.getAddress(1, this.token).subscribe( response => {
        this.dataSource = new MatTableDataSource<Supplier>(this.suppliers);
        },
      )

      console.log(this.suppliers);
    },
      error => {
        console.log(error);
      });
  }  

  displayedColumns: string[] = ['name','last_name', 'phone', 'email','address','actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit()
  {
    this.dataSource.paginator = this.paginator;
  }
  
  Buscar(event: Event)
  {
    const Busqueda = (event.target as HTMLInputElement).value;
    this.dataSource.filter = Busqueda.trim().toLowerCase();
  }

  insert(){
    this.router.navigate(['suppliers/create']);
  }

  edit($e){
    console.log($e);
    this.router.navigate(['/suppliers/edit', $e.slug]);
  }

}
