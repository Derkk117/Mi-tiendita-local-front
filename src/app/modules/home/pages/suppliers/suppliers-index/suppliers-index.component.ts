
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table'

export interface Proveedores {
  id: string;
  name: string;
  last_name: string;
  phone: string;
  email: string;
  address: string;
}

const ELEMENT_DATA: Proveedores[] = [
  {id: "1", name: 'Roberto', last_name: 'Rodriguez', phone: '456123789' ,email: 'correo@hotmail.com', address: 'Calle 123'},
  {id: "1", name: 'Mario', last_name: 'Rodriguez', phone: '456123789' ,email: 'correo@hotmail.com', address: 'Calle 123'},
  {id: "1", name: 'Luis', last_name: 'Rodriguez', phone: '456123789' ,email: 'correo@hotmail.com', address: 'Calle 123'},
  {id: "1", name: 'Marcos', last_name: 'Rodriguez', phone: '456123789' ,email: 'correo@hotmail.com', address: 'Calle 123'},
  {id: "1", name: 'Marina', last_name: 'Rodriguez', phone: '456123789' ,email: 'correo@hotmail.com', address: 'Calle 123'},
  {id: "1", name: 'Mandarina', last_name: 'Rodriguez', phone: '456123789' ,email: 'correo@hotmail.com', address: 'Calle 123'},
  {id: "1", name: 'Roberto', last_name: 'Rodriguez', phone: '456123789' ,email: 'correo@hotmail.com', address: 'Calle 123'},
  {id: "1", name: 'Roberto', last_name: 'Rodriguez', phone: '456123789' ,email: 'correo@hotmail.com', address: 'Calle 123'},
];


@Component({
  selector: 'app-suppliers-index',
  templateUrl: './suppliers-index.component.html',
  styleUrls: ['./suppliers-index.component.scss']
})

export class SuppliersIndexComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}  

  displayedColumns: string[] = ['select', 'id', 'name',
  'last_name', 'phone', 'email','address','Editar', 'Eliminar'];

  dataSource = new MatTableDataSource<Proveedores>(ELEMENT_DATA);
  selection = new SelectionModel<Proveedores>(true, []);

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

  checkboxLabel(row?: Proveedores): string 
  {
    if (!row) 
    {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.address + 1}`;
  }

  Buscar(event: Event)
  {
    const Busqueda = (event.target as HTMLInputElement).value;
    this.dataSource.filter = Busqueda.trim().toLowerCase();
  }
}
