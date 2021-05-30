import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../../../../shared/models/Client_model';
import { ClientService } from 'src/app/shared/services/Client_service';
import { HistoryService } from 'src/app/shared/services/History_service';

@Component({
  selector: 'app-client-store',
  templateUrl: './client-store.component.html',
  styleUrls: ['./client-store.component.scss'],
  providers: [
    ClientService,
    ToastrService,
    HistoryService
  ]
})
export class ClientStoreComponent implements OnInit {
  clientSku = null;
  client: Client;
  token
  identity
  history = {};
  date = new Date();

  constructor(
    private activatedRoute: ActivatedRoute,
    private _clientService: ClientService,
    private _historyService: HistoryService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.clientSku = this.activatedRoute.snapshot.paramMap.get('sku');
  }
  
  ngOnInit(): void {
    this.identity = JSON.parse(localStorage.getItem('identity'));
    this.token = localStorage.getItem('session');
    this.client = new Client("","","","","","","",""); //Intialize new client
  }

  save(){
    console.log(this.client);
    this._clientService.store(this.token, this.client, this.identity.id).subscribe(
      response =>{

        this.date = new Date();
        
        this.history = 
        { 
          "id_user": this.identity.id, 
          "description": "Registro de cliente",
          "date": this.date.getFullYear() +"-"+ (this.date.getMonth()+1) +"-"+this.date.getDate(),
          "time": this.date.getHours() +":"+this.date.getMinutes()+":"+this.date.getSeconds()
        };
        this._historyService.create(this.history,this.token).subscribe();

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
