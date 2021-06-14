import { Component, OnInit } from '@angular/core';
import { Store } from 'src/app/shared/models/Store_model';
import { Address } from 'src/app/shared/models/Address_model';
import { StoreService } from 'src/app/shared/services/Store_service';
import { AddressService } from 'src/app/shared/services/Address_service';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-store-index',
  templateUrl: './store-index.component.html',
  styleUrls: ['./store-index.component.scss'],
  providers: [
    StoreService,
    AddressService,
    ToastrService
  ]
})

export class StoreIndexComponent implements OnInit {
  identity;
  token;
  apiUrl = "http://localhost:8000/api/store/";
  store = new Store(0 , 0, "", "", "", 0, "");
  address = new Address(null,"","","","","","","","");
  public imagePath;
  imgURL: any;
  public imagePath2;
  imgURL2: any;
  public message: string;
  constructor(
    private _storeService: StoreService,
    private _addressService: AddressService,
    private toastr: ToastrService
  ) { 
  }

  ngOnInit(){
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

  select(event: any){
    let files = [].slice.call(event.target.files);
    var reader = new FileReader();
    this.imagePath = event.target.files[0];
    reader.readAsDataURL(event.target.files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }

  select2(event: any){
    let files = [].slice.call(event.target.files);
    var reader = new FileReader();
    this.imagePath2 = event.target.files[0];
    reader.readAsDataURL(event.target.files[0]); 
    reader.onload = (_event) => { 
      this.imgURL2 = reader.result; 
    }
  }

  save(){
    console.log(this.store);
    // this._addressService.create(this.token, this.address).subscribe(
    //   response => {
    //     this._addressService.getLast(this.token).subscribe(
    //       response => {
    //         this.store.address = response.id;
    //         this.store.user_id = this.identity.id;
    //         // Create store object with files.
    //         let storeData: FormData = new FormData();
    //         if (this.imagePath) storeData.append('logo', this.imagePath, this.imagePath.name);
    //         if (this.imagePath2) storeData.append('thum', this.imagePath2, this.imagePath2.name);
    //         storeData.append('phone', this.store.phone);
    //         storeData.append('address', this.store.address.toString());
    //         storeData.append('user_id', this.store.user_id.toString());
    //         storeData.append('name', this.store.name);

    //         this._storeService.create(this.token, storeData).subscribe(
    //           response => {
    //             // update user with store id.
    //             localStorage.setItem('identity', JSON.stringify(response.message));
    //             this.toastr.success(":)", 'Datos guardados correctamente.');
    //           },
    //           error => {
    //             console.log(error);
    //             this.toastr.error("Error al guardar, vuelve a intentarlo más tarde.", 'Error');
    //           }
    //         )
    //       },
    //       error => {
    //         this.toastr.error("Error al guardar, vuelve a intentarlo más tarde.", 'Error');
    //       }
    //     )
    //   },
    //   error => {
    //     this.toastr.error("Error al guardar, vuelve a intentarlo más tarde", 'Error');
    //   }
    // )
  }
}