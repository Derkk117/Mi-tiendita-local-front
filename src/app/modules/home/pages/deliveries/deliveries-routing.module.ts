import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeliveriesIndexComponent } from './deliveries-index/deliveries-index.component';
import { DeliveriesCreateComponent } from './deliveries-create/deliveries-create.component';
import { DeliveriesEditComponent } from './deliveries-edit/deliveries-edit.component';

export const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full'},
  { path: 'index', component: DeliveriesIndexComponent },
  { path: 'create', component: DeliveriesCreateComponent },
  { path: 'edit', component: DeliveriesEditComponent },
//   { path: 'products/:id', component:  productseditcompo},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DeliveriesRoutingModule {}

