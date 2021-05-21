import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Client } from '../../../../../shared/models/Client_model';
import { ClientService } from 'src/app/shared/services/Client_service';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss'],
  providers: [ClientService]
})
export class ClientEditComponent implements OnInit {
  clientSku = null;
  client: Client;
  token

  constructor(
    private activatedRoute: ActivatedRoute,
    private _clientService: ClientService
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
}
