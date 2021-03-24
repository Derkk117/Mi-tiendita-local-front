
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table'

export interface Proveedores {
  name: string;
  last_name: string;
  phone: string;
  email: string;
  address: string;
}

const ELEMENT_DATA: Proveedores[] = [
  {name: 'Roberto', last_name: 'Rodriguez', phone: '456123789' ,email: 'uncorreo@hotmail.com', address: '1'},
];


@Component({
  selector: 'app-suppliers-index',
  templateUrl: './suppliers-index.component.html',
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
  `]
})

export class SuppliersIndexComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }  

  displayedColumns: string[] = ['name', 'last_name', 'phone', 'email','address','edit','select'];
  dataSource = new MatTableDataSource<Proveedores>(ELEMENT_DATA);
  selection = new SelectionModel<Proveedores>(true, []);

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

  checkboxLabel(row?: Proveedores): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.address + 1}`;
  }

  Buscar(event: Event){
    const Busqueda = (event.target as HTMLInputElement).value;
    this.dataSource.filter = Busqueda.trim().toLowerCase();
  }

}

