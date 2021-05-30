import { ToastrService } from 'ngx-toastr';
import { SelectionModel } from '@angular/cdk/collections';
import { ViewChild, Component, OnInit } from '@angular/core';
import { MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table'
import { Router } from '@angular/router';
import { MatDialog} from '@angular/material/dialog';
import { Cutoff } from 'src/app/shared/models/Cutoff_model';
import { CutoffService } from 'src/app/shared/services/Cutoff_service';
import { DialogOverviewDelete } from 'src/app/shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-cortes',
  templateUrl: './cortes.component.html',
  styleUrls: ['./cortes.component.scss'],
    //Se llama al servidor de producto
    providers: [
      CutoffService,
      ToastrService
    ]
})

export class CortesComponent implements OnInit{

  token;
  identity;
  cortes = [];
  dataSource: any;
  pageNumber: any;
  selection = new SelectionModel<Cutoff>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  displayedColumns: string[] = [
    'dateInicio',
    'dateFinal',
    'total',
    'Acciones'
  ];

  constructor(
    private _cutoffService: CutoffService, 
    private router: Router,
    public dialog: MatDialog,
    private toastr: ToastrService
    ) { }


  ngOnInit() {
    this.identity = JSON.parse(localStorage.getItem('identity'));
    this.token = localStorage.getItem('session');
    this._cutoffService.getCutoffs(this.token, this.identity.id).subscribe(response => {
      this.cortes = response;
      this.dataSource = new MatTableDataSource<Cutoff>(this.cortes);
      if (this.dataSource != null) {
        console.log(this.dataSource);
        this.dataSource.paginator = this.paginator;
      }
    },
      error => {
        console.log(error);
      });
  }

  Buscar(event: Event)
  {
    const Busqueda = (event.target as HTMLInputElement).value;
    this.dataSource.filter = Busqueda.trim().toLowerCase();
  }

  add(){    
    this.router.navigate(['cortes/create/']);
  }

  edit(element)
  {
    this.router.navigate(['cortes/edit/'+ element.sku]);
  }

  goToPage() {
    this.paginator.pageIndex = this.pageNumber, // number of the page you want to jump.
      this.paginator.page.next({
        pageIndex: this.pageNumber,
        pageSize: this.paginator.pageSize,
        length: this.paginator.length
      });
  }

  openDialog(element) {
    const dialogRef = this.dialog.open(DialogOverviewDelete, {
      width: '500px',
      data: { title: "Eliminar corte " + element.sku, body: "¿Deseas continuar con la eliminación de la entrega?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result == 'Continuar') {
        this._cutoffService.delete(this.token, element.sku).subscribe(result => {
          this._cutoffService.getCutoffs(this.token, this.identity.id).subscribe(response => {
            this.cortes = response;
            this.dataSource = new MatTableDataSource<Cutoff>(this.cortes);
          },
          error => {
            console.log(error);
          });
          this.toastr.success(":)", 'Se han guardado los cambios correctamente');
        },
        error => {
            this.toastr.error("Error al actualizar, vuelve a intentarlo más tarde", 'Error');
          });
      }
    });
  }
}
