import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsRoutingModule } from './clients-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { ClientStoreComponent } from './client-store/client-store.component';
import { ClientsIndexComponent } from './clients-index/clients-index.component';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DialogOverviewDelete } from 'src/app/shared/delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [
    ClientsIndexComponent,
    ClientEditComponent,
    DialogOverviewDelete,
    ClientStoreComponent
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
      positionClass: 'toast-top-right'
    })
  ]
})
export class HomeModule { }
