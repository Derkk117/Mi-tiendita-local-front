import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table'

export interface sales {
  id: string;
  Client_Id: string;
  User_Id: string;
  Products: string;
  payment_method: string;
  Card_Number:string;
  Card_cvc:string;
  expiration:string;
}

const ELEMENT_DATA: sales[] = [
  {id: '1', Client_Id: '2', User_Id: '3', Products: 'CocaCola' ,payment_method: 'Tarjeta', Card_Number: '125469',
  Card_cvc: '12', expiration: '2021'},

  {id: '2', Client_Id: '3', User_Id: '4', Products: 'Sabritas' ,payment_method: 'Tarjeta', Card_Number: '125469',
  Card_cvc: '12', expiration: '2021'},

  {id: '3', Client_Id: '4', User_Id: '5', Products: 'Agua' ,payment_method: 'Tarjeta', Card_Number: '125469',
  Card_cvc: '12', expiration: '2021'},

  {id: '4', Client_Id: '5', User_Id: '6', Products: 'Chocolate' ,payment_method: 'Tarjeta', Card_Number: '125469',
  Card_cvc: '12', expiration: '2021'}
];


@Component({
  selector: 'app-sales-index',
  templateUrl: './sales-index.component.html',
  styleUrls: ['./sales-index.component.scss']
})

export class SalesIndexComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {} 

  displayedColumns: string[] = ['select', 'id', 'Client_Id',
  'User_Id', 'Products','payment_method','Card_Number','Card_cvc','expiration','Editar', 'Eliminar'];

  dataSource = new MatTableDataSource<sales>(ELEMENT_DATA);
  selection = new SelectionModel<sales>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit()
  {
    this.dataSource.paginator = this.paginator;
  }
  
  isAllSelected() 
  {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() 
  {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: sales): string 
  {
    if (!row) 
    {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  Buscar(event: Event)
  {
    const Busqueda = (event.target as HTMLInputElement).value;
    this.dataSource.filter = Busqueda.trim().toLowerCase();
  }
}