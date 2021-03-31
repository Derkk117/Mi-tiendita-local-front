import { NgModule } from '@angular/core';
// import { SwiperModule } from 'swiper/angular';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { StoreEditComponent} from './store-edit/store-edit.component';
import { StoreRoutingModule } from './store-routing.module';
import { StoreIndexComponent } from './store-index/store-index.component';
import { StoreCreateComponent } from './store-create/store-create.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    StoreIndexComponent,
    StoreEditComponent,
    StoreCreateComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,

    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule,
    MatListModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
