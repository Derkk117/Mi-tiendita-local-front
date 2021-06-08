import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/User_service';
import { StoreService } from 'src/app/shared/services/Store_service';
import { AddressService } from 'src/app/shared/services/Address_service';
import { Store } from 'src/app/shared/models/Store_model';

@Component({
  selector: 'app-store-index',
  templateUrl: './store-index.component.html',
  styleUrls: ['./store-index.component.scss'],
  providers: [UserService,StoreService,AddressService]
})

export class StoreIndexComponent implements OnInit {
  identity;
  token;
  store;
  address;

  constructor(
    private _userService: UserService,
    private _storeService: StoreService,
    private _addressService: AddressService
  ) { 
  }

  ngOnInit()/*:void*/ {

    this.identity = JSON.parse(localStorage.getItem('identity'));
    this.token = localStorage.getItem('session');

    this._storeService.getStore(this.identity.store_id, this.token).subscribe(
      response => {
        this.store = JSON.parse(JSON.stringify(response));

        this._addressService.getAddress(this.store.address,this.token).subscribe(
          response => {
            this.address = JSON.parse(JSON.stringify(response));
          }
        );
      }
    );
  }
}

const ELEMENT_DATA: Store[] = null;