import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cutoff } from '../../../../../shared/models/Cutoff_model';
import { CutoffService } from 'src/app/shared/services/Cutoff_service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-cortes-create',
  templateUrl: './cortes-create.component.html',
  styleUrls: ['./cortes-create.component.scss'],
  providers: [
    CutoffService,
    ToastrService,

  ]
})
export class CortesCreateComponent implements OnInit {
  cutoffSku = null;
  cutoff: Cutoff;
  token
  identity
  events : string[]
  date = new Date();
  

  constructor(
    private activatedRoute: ActivatedRoute,
    private _cutoffService: CutoffService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.cutoffSku = this.activatedRoute.snapshot.paramMap.get('sku');
  }

  ngOnInit(): void {
    this.identity = JSON.parse(localStorage.getItem('identity'));
    this.token = localStorage.getItem('session');
    this.cutoff = new Cutoff( this.cutoffSku , this.identity.id ,"","",""); 
  }

  save(){
    this._cutoffService.create(this.cutoff, this.token ).subscribe(
      response =>{

        this.toastr.success(":)", 'Se ha creado correctamente');
        this.router.navigate(['/cortes/index']);
      },
      error =>{
        this.toastr.error("Error al actualizar, vuelve a intentarlo más tarde", 'Error');     
      }
    )
  }

  goBack(){
    this.router.navigate(['/cortes/index']);
  }

  
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(event);
    this.events.push(`${type}: ${event.value}`);
    console.log("hola");
    console.log(this.events);
  }

}
