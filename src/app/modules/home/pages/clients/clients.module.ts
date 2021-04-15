import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsIndexComponent } from './clients-index/clients-index.component';
import { ClientsRoutingModule } from './clients-routing.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    ClientsIndexComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    MatIconModule
  ]
})
export class HomeModule { }
