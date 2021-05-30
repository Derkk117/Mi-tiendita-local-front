import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cutoff } from '../../../../../shared/models/Cutoff_model';
import { CutoffService } from 'src/app/shared/services/Cutoff_service';

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
    this.cutoff = new Cutoff("","","","",""); 
  }

  save(){
    console.log(this.cutoff);
    console.log(this.token);
    if(this.cutoff.initial_date != "" && this.cutoff.final_date &&
    this.cutoff.total != "")
        {
        this._cutoffService.create(this.cutoff,this.token).subscribe(
        
        )
    }
  }

  goBack(){
    this.router.navigate(['cortes/']);
  }

}
