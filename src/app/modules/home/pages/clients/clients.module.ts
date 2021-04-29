import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsIndexComponent } from './clients-index/clients-index.component';
import { ClientsRoutingModule } from './clients-routing.module';
import { MatIconModule } from '@angular/material/icon';

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

@NgModule({
  declarations: [
    ClientsIndexComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
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
