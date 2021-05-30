import { Router } from '@angular/router';
import { MatPaginator} from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource} from '@angular/material/table'
import { Cutoff } from 'src/app/shared/models/Cutoff_model';
import { ViewChild, Component, OnInit } from '@angular/core';
import { CutoffService } from 'src/app/shared/services/Cutoff_service';

@Component({
  selector: 'app-cortes',
  templateUrl: './cortes.component.html',
  styleUrls: ['./cortes.component.scss'],
    //Se llama al servidor de producto
    providers: [CutoffService],
})

export class CortesComponent implements OnInit{

  token;
  identity;
  cortes = [];
  dataSource: any;
  selection = new SelectionModel<Cutoff>(true, []);
  
  displayedColumns: string[] = ['dateInicio','dateFinal','total','Acciones'];

  constructor(private _cutoffService: CutoffService, private router: Router) 
  {}

  ngOnInit() {
    this.identity = JSON.parse(localStorage.getItem('identity'));
    this.token = localStorage.getItem('session');
    this._cutoffService.getCutoffs(this.token, this.identity.id).subscribe(response => {
      this.cortes = response;
      this.dataSource = new MatTableDataSource<Cutoff>(this.cortes);
    },
      error => {
        console.log(error);
      });
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit()
  {
    this.dataSource.paginator = this.paginator;
  }  

  Buscar(event: Event)
  {
    const Busqueda = (event.target as HTMLInputElement).value;
    this.dataSource.filter = Busqueda.trim().toLowerCase();
  }

  add(){    
    this.router.navigate(['cortes/create/']);
  }

  edit(element)
  {
    this.router.navigate(['cortes/edit/'+ element.sku]);
  }
}
