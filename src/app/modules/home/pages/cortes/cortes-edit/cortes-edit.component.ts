import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//Se importa el modelo y el servidor de producto
import { Cutoff } from 'src/app/shared/models/Cutoff_model';
import { CutoffService } from 'src/app/shared/services/Cutoff_service';

@Component({
  selector: 'app-cortes-edit',
  templateUrl: './cortes-edit.component.html',
  styleUrls: ['./cortes-edit.component.scss'],
  providers: [CutoffService],
})
export class CortesEditComponent implements OnInit {

  cutoffSku = null;
  cutoff: Cutoff;
  token;

  constructor(private activatedRoute: ActivatedRoute, private _cutoffService: CutoffService) 
  {
    this.cutoffSku = this.activatedRoute.snapshot.paramMap.get('sku');
  }

  ngOnInit(): void 
  {
    this.token = localStorage.getItem('session');
    if(this.cutoffSku && this.token != null)
    {
      this._cutoffService.getCutoffs(this.token, this.cutoffSku).subscribe(response=>{
        this.cutoff = response;
        console.log(this.cutoff);
      },
      error =>{
        console.log(error)
      });
    }    
  }

}
