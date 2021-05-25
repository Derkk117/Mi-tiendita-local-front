import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../../../../shared/models/Client_model';
import { ClientService } from 'src/app/shared/services/Client_service';

@Component({
  selector: 'app-client-store',
  templateUrl: './client-store.component.html',
  styleUrls: ['./client-store.component.scss'],
  providers: [
    ClientService,
    ToastrService,
  ]
})
export class ClientStoreComponent implements OnInit {
  clientSku = null;
  client: Client;
  token
  identity

  constructor(
    private activatedRoute: ActivatedRoute,
    private _clientService: ClientService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.clientSku = this.activatedRoute.snapshot.paramMap.get('sku');
  }
  
  ngOnInit(): void {
    this.identity = JSON.parse(localStorage.getItem('identity'));
    this.token = localStorage.getItem('session');
    this.client = new Client("","","","","","",""); //Intialize new client
  }

  save(){
    console.log(this.client);
    this._clientService.store(this.token, this.client, this.identity.id).subscribe(
      response =>{
        this.toastr.success(":)", 'Se han creado correctamente');
        this.router.navigate(['/clients/index']);
      },
      error =>{
        this.toastr.error("Error al actualizar, vuelve a intentarlo más tarde", 'Error');     
      }
    )
  }

  goBack(){
    this.router.navigate(['/clients/index']);
  }
}
