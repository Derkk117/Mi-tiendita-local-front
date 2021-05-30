import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { History} from '../../../../../shared/models/History_model';
import { HistoryService} from '../../../../../shared/services/History_service';


@Component({
  selector: 'app-histories-index',
  templateUrl: './histories-index.component.html',
  styleUrls: ['./histories-index.component.scss'],
  providers: [HistoryService]
})
export class HistoriesIndexComponent implements OnInit {
  token;
  identity;
  histories = [];
  dataSource:any;
  selection = new SelectionModel<History>(true, []);

  constructor(
    private router: Router,
    private _HistoryService: HistoryService,
    ) {}

  ngOnInit() {
    this.identity = JSON.parse(localStorage.getItem('identity'));
    this.token = localStorage.getItem('session');
    this._HistoryService.getHistories(this.token,this.identity.id).subscribe(response => {
      this.histories = response;
      this.dataSource = new MatTableDataSource<History>(this.histories);
    },
      error => {
        console.log(error);
      });
  }  

  displayedColumns: string[] = ['description','date', 'time'];

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


