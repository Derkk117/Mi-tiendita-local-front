import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../../../../shared/models/Client_model';
import { ClientService } from 'src/app/shared/services/Client_service';
import { HistoryService } from 'src/app/shared/services/History_service';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss'],
  providers: [
    ClientService,
    ToastrService,
    HistoryService
  ]
})
export class ClientEditComponent implements OnInit {
  clientSku = null;
  client: Client;
  token
  history = {}
  date = new Date();
  identity;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _clientService: ClientService,
    private router: Router,
    private toastr: ToastrService,
    private _historyService: HistoryService
  ) {
    this.clientSku = this.activatedRoute.snapshot.paramMap.get('sku');
    this.identity = JSON.parse(localStorage.getItem('identity'));
  }
  
  ngOnInit(): void {
    this.token = localStorage.getItem('session');
    if(this.clientSku && this.token != null){
      this._clientService.getClient(this.token, this.clientSku).subscribe(response=>{
        this.client = response;
      },
      error =>{
        console.log(error)
      });
    }    
  }

  save(){
    this._clientService.update(this.token, this.clientSku, this.client).subscribe(
      response =>{

        this.date = new Date();
        
        this.history = 
        { 
          "id_user": this.identity.id, 
          "description": "Actualizacion de datos del cliente",
          "date": this.date.getFullYear() +"-"+ this.date.getMonth() +"-"+this.date.getDay(),
          "time": this.date.getHours() +":"+this.date.getMinutes()+":"+this.date.getSeconds()
        };
        this._historyService.create(this.history,this.token).subscribe();

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
