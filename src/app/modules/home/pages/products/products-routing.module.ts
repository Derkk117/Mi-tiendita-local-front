import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsIndexComponent } from './products-index/products-index.component';
import { ProductsCreateComponent } from './products-create/products-create.component';
import { ProductsEditComponent } from './products-edit/products-edit.component';

export const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full'},
  { path: 'index', component: ProductsIndexComponent },
  { path: 'create', component: ProductsCreateComponent },
  { path: 'edit/:sku', component: ProductsEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProducstRoutingModule {}

