import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, ViewChild, Component, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table'

@Component({
  selector: 'app-deliveries-index',
  templateUrl: './deliveries-index.component.html',
  styles: [`
  table{
    width: 90%;
    margin: 1rem auto;
    box-shadow: -1px 3px 66px 0px rgba(0,0,0,0.75);
    padding: 1rem;
    border-radius: 10px;
  }
  .container{
    width: 90%;
    margin: 1rem auto;
    padding: 1rem;
    border-radius: 10px;
  }
  button{
    background-color: transparent;
    border: none;
  }
  mat-icon{
    color: #FE6D73;
  }
  mat-form-field{
    font-size: 14px;
    width: 100%;
    padding: 1rem;
    margin: 1rem auto;
    border: 1px;
    border-radius: 10px;
  }
  #input_container{
    position:relative;
    padding:0 0 0 20px;
    margin:0 20px;
    background:#ddd;
    direction: rtl;
    width: 200px;
    height: 23px;
    left: 0px;
    border-radius: 10px;
  }
  #input_icon{
    position:absolute;
    bottom: .1px;
    right: 6px;
    width: ;
    height: ;
  }
  .mat-button{
    color: #FFFFFF;
    background-color: #326273;
  }
  .btn{
    cursor:pointer;
  }
  img{
    width: 40px;
    height: 40px;
  }
`]
})
export class DeliveriesIndexComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['date','place','status'];
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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.date + 1}`;
  }

  Buscar(event: Event){
    const Busqueda = (event.target as HTMLInputElement).value;
    this.dataSource.filter = Busqueda.trim().toLowerCase();
  }

}

export interface Entregas {
  date: string;
  place: string;
  status: string;
}

const ELEMENT_DATA: Entregas[] = [
  {date: 'Viernes, 09 de Abril', place: 'Calle Benito Juarez', status: 'Pending' },
];
