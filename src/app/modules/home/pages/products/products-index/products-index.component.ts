import { SelectionModel } from '@angular/cdk/collections';
import { ViewChild, Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table'

export interface Productos {
  id : string;
  name: string;
  description: string;
  price: string;
  cost: string;
  stock: string;
  image: string;
  category: string;
}

const ELEMENT_DATA: Productos[] = [
  {id: "1", name: 'Sabritas', description: 'bolsa amarrilla', 
  price: '$13', cost:'$10',stock:'20', 
  image: 'https://www.superama.com.mx/Content/images/products/img_large/0750101111561L.jpg', category:'botana' },
  {id: "1", name: 'Sabritas', description: 'bolsa amarrilla', 
  price: '$13', cost:'$10',stock:'20', 
  image: 'https://www.superama.com.mx/Content/images/products/img_large/0750101111561L.jpg', category:'botana' },
  {id: "1", name: 'Ruffles', description: 'bolsa verde', 
  price: '$13', cost:'$10',stock:'20', 
  image: 'https://http2.mlstatic.com/D_NQ_NP_678140-MLM40168271778_122019-O.jpg', category:'botana' },
];

@Component({
  selector: 'app-products-index',
  templateUrl: './products-index.component.html',
  styleUrls: ['./products-index.component.scss']
})

export class ProductsIndexComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }  

  displayedColumns: string[] = ['select', 'id' ,'name','description','price','cost','stock','image','category','editar', 'eliminar'];

  dataSource = new MatTableDataSource<Productos>(ELEMENT_DATA);
  selection = new SelectionModel<Productos>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
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