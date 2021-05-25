import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesCreateComponent } from './sales-create/sales-create.component';
import { SalesIndexComponent } from './sales-index/sales-index.component';
import { SalesEditComponent } from './sales-edit/sales-edit.component';
export const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full'},
  { path: 'index', component: SalesIndexComponent },
  { path: 'create', component: SalesCreateComponent},
  
  { path: 'edit/:sku', component: SalesEditComponent},
//   { path: 'products/:id', component:  productseditcompo},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule {}