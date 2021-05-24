import { SelectionModel } from '@angular/cdk/collections';
import { ViewChild, Component, OnInit } from '@angular/core';
import { MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table'
import { Router } from '@angular/router';
import { Cutoff } from 'src/app/shared/models/Cutoff_model';
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
    /*this.identity = JSON.parse(localStorage.getItem('identity'));
    this.token = localStorage.getItem('session');
    this._cutoffService.getCortes(this.token, this.identity.id).subscribe(response => {
      this.cortes = response;
      this.dataSource = new MatTableDataSource<Cutoff>(this.cortes);
    },
      error => {
        console.log(error);
      });*/
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
}
