import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//Se importa el modelo y el servidor de producto
import { Cutoff } from 'src/app/shared/models/Cutoff_model';
import { CutoffService } from 'src/app/shared/services/Cutoff_service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cortes-edit',
  templateUrl: './cortes-edit.component.html',
  styleUrls: ['./cortes-edit.component.scss'],
  providers: [
    CutoffService,
    ToastrService,
  ]
})
export class CortesEditComponent implements OnInit {

  cutoffSku = null;
  cutoff: Cutoff;
  token;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private _cutoffService: CutoffService,
    private router: Router,
    private toastr: ToastrService,
  ) 
  {
    this.cutoffSku = this.activatedRoute.snapshot.paramMap.get('sku');
  }

  ngOnInit(): void 
  {
    this.token = localStorage.getItem('session');
    if(this.cutoffSku && this.token != null)
    {
      this._cutoffService.getCutoff(this.token, this.cutoffSku).subscribe(response=>{
        this.cutoff = response;
        console.log(this.cutoff);
      },
      error =>{
        console.log(error)
      });
    }    
  }
  
  save(){
    this._cutoffService.update(this.token, this.cutoffSku, this.cutoff).subscribe(
      response =>{
        this.toastr.success(":)", 'Se han guardado los cambios correctamente');
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
}


