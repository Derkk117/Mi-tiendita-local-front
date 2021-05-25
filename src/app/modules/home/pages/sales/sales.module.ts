import { NgModule } from '@angular/core';
// import { SwiperModule } from 'swiper/angular';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SalesRoutingModule } from './sales-routing.module';
import { SalesIndexComponent } from './sales-index/sales-index.component';
import { SalesCreateComponent } from './sales-create/sales-create.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatButtonModule} from '@angular/material/button';
import {FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule} from '@angular/material/select';
import { MatPaginatorModule} from '@angular/material/paginator';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SalesEditComponent } from './sales-edit/sales-edit.component';

import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
//import { DialogOverviewDelete } from 'src/app/shared/delete-dialog/delete-dialog.component';
@NgModule({
  declarations: [
    SalesIndexComponent,
    SalesCreateComponent,
    SalesEditComponent
],
  imports: [
    CommonModule,
    SalesRoutingModule,
    MatIconModule,
    MatTableModule,
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
    
    MatToolbarModule,
    MatProgressSpinnerModule,

    MatDialogModule,
    FlexLayoutModule,
    ToastrModule.forRoot({
      positionClass :'toast-top-right'
    })
  ]
})
export class HomeModule { }
