import { NgModule } from '@angular/core';
// import { SwiperModule } from 'swiper/angular';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ProducstRoutingModule } from './products-routing.module';
import { ProductsCreateComponent } from './products-create/products-create.component';
import { ProductsIndexComponent } from './products-index/products-index.component';
 
@NgModule({
  declarations: [
    ProductsCreateComponent,
    ProductsIndexComponent
],
  imports: [
    CommonModule,
    ProducstRoutingModule,
    MatIconModule
  ]
})
export class HomeModule { }
