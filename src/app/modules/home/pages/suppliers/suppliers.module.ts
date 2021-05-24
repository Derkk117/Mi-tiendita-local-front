import { NgModule } from '@angular/core';
// import { SwiperModule } from 'swiper/angular';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SuppliersRoutingModule } from './suppliers-routing.module';
import { SuppliersCreateComponent } from './suppliers-create/suppliers-create.component';
import { SuppliersIndexComponent } from './suppliers-index/suppliers-index.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatButtonModule} from '@angular/material/button';
import {FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule} from '@angular/material/select';
import { SuppliersEditComponent } from './suppliers-edit/suppliers-edit.component';
import { MatPaginatorModule} from '@angular/material/paginator';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    SuppliersCreateComponent,
    SuppliersIndexComponent,
    SuppliersEditComponent
],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    SuppliersRoutingModule,
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
    MatPaginatorModule
  ]
})
export class HomeModule { }
