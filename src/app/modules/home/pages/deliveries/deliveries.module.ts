import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DeliveriesRoutingModule } from './deliveries-routing.module';
import { DeliveriesIndexComponent } from './deliveries-index/deliveries-index.component';
import { DeliveriesCreateComponent } from './deliveries-create/deliveries-create.component';
import { DeliveriesEditComponent } from './deliveries-edit/deliveries-edit.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatButtonModule} from '@angular/material/button';
import {FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule} from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

 
@NgModule({
  declarations: [
    DeliveriesIndexComponent,
    DeliveriesEditComponent,   
    DeliveriesCreateComponent
],
  imports: [
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
    DeliveriesRoutingModule,
    MatIconModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    FlexLayoutModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule,
    MatListModule,
    MatSelectModule,
    MatDialogModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right'
    })
  ]
})
export class HomeModule { }
