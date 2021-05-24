import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../../../../shared/models/Client_model';
import { ClientService } from 'src/app/shared/services/Client_service';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss'],
  providers: [
    ClientService,
    ToastrService,
  ]
})
export class ClientEditComponent implements OnInit {
  clientSku = null;
  client: Client;
  token

  constructor(
    private activatedRoute: ActivatedRoute,
    private _clientService: ClientService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.clientSku = this.activatedRoute.snapshot.paramMap.get('sku');
  }
  
  ngOnInit(): void {
    this.token = localStorage.getItem('session');
    if(this.clientSku && this.token != null){
      this._clientService.getClient(this.token, this.clientSku).subscribe(response=>{
        this.client = response;
        console.log(this.client);
      },
      error =>{
        console.log(error)
      });
    }    
  }

  save(){
    this._clientService.update(this.token, this.clientSku, this.client).subscribe(
      response =>{
        this.toastr.success(":)", 'Se han guardado los cambios correctamente');
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
