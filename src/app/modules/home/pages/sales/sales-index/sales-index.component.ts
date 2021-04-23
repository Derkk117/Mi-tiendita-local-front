import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table'

export interface sales {
  IdCliente: string;
  IdEntrepreneur: string;
  Products: string;
  Payment: string;
}

const ELEMENT_DATA: sales[] = [
  {IdCliente: '1', IdEntrepreneur: '2', Products: 'CocaCola' ,Payment: 'CASH'},
  {IdCliente: '2', IdEntrepreneur: '2', Products: 'Chetos' ,Payment: 'CASH'},
  {IdCliente: '3', IdEntrepreneur: '2', Products: 'Jabon Salvo' ,Payment: 'CASH'},
  {IdCliente: '4', IdEntrepreneur: '2', Products: 'Palomitas' ,Payment: 'CASH'},
  {IdCliente: '5', IdEntrepreneur: '2', Products: 'Jamon' ,Payment: 'CASH'},
  {IdCliente: '6', IdEntrepreneur: '2', Products: 'CocaCola' ,Payment: 'CASH'},
  {IdCliente: '7', IdEntrepreneur: '2', Products: 'Chetos' ,Payment: 'CASH'},
  {IdCliente: '8', IdEntrepreneur: '2', Products: 'Jabon Salvo' ,Payment: 'CASH'},
  {IdCliente: '9', IdEntrepreneur: '2', Products: 'Palomitas' ,Payment: 'CASH'},
  {IdCliente: '10', IdEntrepreneur: '2', Products: 'Jamon' ,Payment: 'CASH'},
];


@Component({
  selector: 'app-sales-index',
  templateUrl: './sales-index.component.html',
  styles: [`
    table{
      width: 90%;
      margin: 1rem auto;
      box-shadow: -1px 1px 1px 0px rgba(0,0,0,0.1);
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

    .mat-elevation-z8 th{
      background-color: #FE6D73;
      color: white;
      height: 35px;
  }
  `]
})

export class SalesIndexComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }  

  displayedColumns: string[] = ['IdCliente', 'IdEntrepreneur', 'Products', 'Payment','edit','select'];
  dataSource = new MatTableDataSource<sales>(ELEMENT_DATA);
  selection = new SelectionModel<sales>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }
  
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

  checkboxLabel(row?: sales): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Payment + 1}`;
  }

  Buscar(event: Event){
    const Busqueda = (event.target as HTMLInputElement).value;
    this.dataSource.filter = Busqueda.trim().toLowerCase();
  }
}