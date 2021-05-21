import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProducstRoutingModule } from './products-routing.module';
import { ProductsCreateComponent } from './products-create/products-create.component';
import { ProductsIndexComponent } from './products-index/products-index.component';
import { ProductsEditComponent } from './products-edit/products-edit.component';

import { MatIconModule } from '@angular/material/icon';
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
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
 
@NgModule({
  declarations: [
    ProductsCreateComponent,
    ProductsIndexComponent,
    ProductsEditComponent
],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    ProducstRoutingModule,
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
    ReactiveFormsModule
  ]
})
export class HomeModule { }







