import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, ViewChild, Component, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table'


@Component({
  selector: 'app-products-index',
  templateUrl: './products-index.component.html',
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

export class ProductsIndexComponent implements AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }  

  displayedColumns: string[] = ['name','description','price','cost','stock','image','category','edit','select'];
  dataSource = new MatTableDataSource<Productos>(ELEMENT_DATA);
  selection = new SelectionModel<Productos>(true, []);

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



  checkboxLabel(row?: Productos): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name + 1}`;
  }

  Buscar(event: Event){
    const Busqueda = (event.target as HTMLInputElement).value;
    this.dataSource.filter = Busqueda.trim().toLowerCase();
  }

}

export interface Productos {
  name: string;
  description: string;
  price: string;
  cost: string;
  stock: string;
  image: string;
  category: string;

}

const ELEMENT_DATA: Productos[] = [
  {name: 'Sabritas', description: 'bolsa amarrilla', price: '$13', cost:'10',stock:'20', image: 'https://www.chedraui.com.mx/medias/7501011133884-00-CH1200Wx1200H?context=bWFzdGVyfHJvb3R8ODM2OTJ8aW1hZ2UvanBlZ3xoNDMvaGJkLzEwODIzNzA3NzIxNzU4LmpwZ3w3ZmI3NDU2ZGUxMDJjM2JmZTg0NWY2NzIxZGNiYzI5OTk0MmM0ZDM4NGRjMGE5YjU3M2U1ZTBjMDU2ZmNkMTkx', category:'botana' },
];