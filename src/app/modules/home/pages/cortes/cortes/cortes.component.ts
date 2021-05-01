import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, ViewChild, Component, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table'

export interface Cortes {
  id: string;
  user_id: string;
  dateInicio: string;
  dateFinal: string;
  total: string;
}

const ELEMENT_DATA: Cortes[] = [
  {id: '1', user_id: '2', dateInicio: '09-04-2021', dateFinal: '10-04-2021', total: '$500'},
  {id: '2', user_id: '3', dateInicio: '10-04-2021', dateFinal: '11-04-2021', total: '$500'},
  {id: '3', user_id: '4', dateInicio: '11-04-2021', dateFinal: '12-04-2021', total: '$500'},
  {id: '4', user_id: '5', dateInicio: '12-04-2021', dateFinal: '13-04-2021', total: '$500'},
  {id: '5', user_id: '6', dateInicio: '13-04-2021', dateFinal: '14-04-2021', total: '$500'},
];

@Component({
  selector: 'app-cortes',
  templateUrl: './cortes.component.html',
  styleUrls: ['./cortes.component.scss']
})
export class CortesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['select','id','user_id','dateInicio','dateFinal','total','Editar','Eliminar'];

  dataSource = new MatTableDataSource<Cortes>(ELEMENT_DATA);
  selection = new SelectionModel<Cortes>(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  checkboxLabel(row?: Cortes): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  Buscar(event: Event){
    const Busqueda = (event.target as HTMLInputElement).value;
    this.dataSource.filter = Busqueda.trim().toLowerCase();
  }

}
