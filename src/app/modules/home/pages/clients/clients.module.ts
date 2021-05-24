import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsRoutingModule } from './clients-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { ClientsIndexComponent } from './clients-index/clients-index.component';
import { DialogOverviewDelete } from 'src/app/shared/delete-dialog/delete-dialog.component';

import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    ClientsIndexComponent,
    ClientEditComponent,
    DialogOverviewDelete
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    ClientsRoutingModule,
    MatIconModule,

    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule,
    MatListModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    ToastrModule.forRoot({
      positionClass :'toast-top-right'
    })
  ]
})
export class HomeModule { }
