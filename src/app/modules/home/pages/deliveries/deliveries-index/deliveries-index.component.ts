import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, ViewChild, Component, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table'

export interface Entregas {
  id: string;
  sale_id: string;
  place: string;
  status: string;
}

const ELEMENT_DATA: Entregas[] = [
  {id: '1', sale_id: '5', place: 'Calle Benito Juarez', status: 'Pendiente'},
  {id: '2', sale_id: '4', place: 'Calle Español', status: 'Pendiente'},
  {id: '3', sale_id: '3', place: 'Calle Soledad', status: 'Pendiente'},
  {id: '4', sale_id: '2', place: 'Calle 123', status: 'Pendiente'},
  {id: '5', sale_id: '1', place: 'Calle Amatista', status: 'Pendiente'},
];


@Component({
  selector: 'app-deliveries-index',
  templateUrl: './deliveries-index.component.html',
  styleUrls: ['./deliveries-index.component.scss']
})
export class DeliveriesIndexComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['select','id','sale_id','place','status','Editar','Eliminar'];

  dataSource = new MatTableDataSource<Entregas>(ELEMENT_DATA);
  selection = new SelectionModel<Entregas>(true, []);

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
  checkboxLabel(row?: Entregas): string {
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
