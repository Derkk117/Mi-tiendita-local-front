
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
      this.dataSource = new MatTableDataSource<Supplier>(this.suppliers);
    },
      error => {
        console.log(error);
      });
  }  

  displayedColumns: string[] = ['name',
  'last_name', 'phone', 'email','address','actions'];

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

}
