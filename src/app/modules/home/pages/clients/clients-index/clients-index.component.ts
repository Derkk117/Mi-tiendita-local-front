import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource} from '@angular/material/table'

export interface UserData {
  id: string;
  name: string;
  last_name: string;
  phone: string;
  email: string;
  payment_method: string;
  //progress: string;
  //color: string;
}

/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

const ELEMENT_DATA: UserData[] = [
  {id: "1", name: 'Jose', last_name: 'Rodriguez', phone: '456123789' ,email: 'correo@hotmail.com', payment_method: 'Tarjeta'},
  {id: "1", name: 'Mario', last_name: 'Rodriguez', phone: '456123789' ,email: 'correo@hotmail.com', payment_method: 'Tarjeta'},
  {id: "1", name: 'Luis', last_name: 'Rodriguez', phone: '456123789' ,email: 'correo@hotmail.com', payment_method: 'Tarjeta'},
  {id: "1", name: 'Marcos', last_name: 'Rodriguez', phone: '456123789' ,email: 'correo@hotmail.com', payment_method: 'Tarjeta'},
  {id: "1", name: 'Marina', last_name: 'Rodriguez', phone: '456123789' ,email: 'correo@hotmail.com', payment_method: 'Tarjeta'},
  {id: "1", name: 'Juan', last_name: 'Rodriguez', phone: '456123789' ,email: 'correo@hotmail.com', payment_method: 'Tarjeta'},
  {id: "1", name: 'Roberto', last_name: 'Rodriguez', phone: '456123789' ,email: 'correo@hotmail.com', payment_method: 'Tarjeta'},
  {id: "1", name: 'Julio', last_name: 'Rodriguez', phone: '456123789' ,email: 'correo@hotmail.com', payment_method: 'Tarjeta'},
];

@Component({
  selector: 'app-clients-index',
  templateUrl: './clients-index.component.html',
  styleUrls: ['./clients-index.component.scss']
})
export class ClientsIndexComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {} 

  displayedColumns: string[] = ['select', 'id', 'name',
  'last_name', 'phone', 'email','payment_method','Editar', 'Eliminar'];

  dataSource = new MatTableDataSource<UserData>(ELEMENT_DATA);
  selection = new SelectionModel<UserData>(true, []);

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

  checkboxLabel(row?: UserData): string 
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

  /*displayedColumns: string[] = ['id', 'name', 'progress', 'color'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    // Create 100 users
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }*/
}

/** Builds and returns a new User. 
function createNewUser(id: number): UserData {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };
} */
