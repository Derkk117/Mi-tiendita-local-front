import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/User_service';
import { StoreService } from 'src/app/shared/services/Store_service';
import { Store } from 'src/app/shared/models/Store_model';

@Component({
  selector: 'app-store-index',
  templateUrl: './store-index.component.html',
  styleUrls: ['./store-index.component.scss'],
  providers: [UserService,StoreService]
})

export class StoreIndexComponent implements OnInit {
  identity;
  token;
  store;

  constructor(
    private _userService: UserService,
    private _storeService: StoreService
  ) { 
    this.identity = JSON.parse(localStorage.getItem('identity'));
    this.token = localStorage.getItem('session');
    this.store = JSON.parse(localStorage.getItem('store'));
  }

  ngOnInit(): void {
    console.log(this.identity);

    /*this._storeService.getStore(this.identity.store_id,this.token).subscribe(
      response => {
        localStorage.setItem('store',JSON.stringify(response));
      }      
    );*/
    /*this._storeService.getStore((JSON.parse(localStorage.getItem('identity'))).store_id,this.token).subscribe(
      response => {
        localStorage.setItem('store',JSON.stringify(response));
      }      
    );*/
    console.log(localStorage.getItem('store'));

    var name = document.getElementById("name") as HTMLInputElement;
    var phone = document.getElementById('phone') as HTMLInputElement;
    var address = document.getElementById('address') as HTMLInputElement;

    name.value = JSON.parse(localStorage.getItem('store')).name;
    phone.value = this.store.phone;
    address.value = this.store.address;
  }

}

const ELEMENT_DATA: Store[] = null;