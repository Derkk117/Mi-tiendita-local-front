import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { ClientStoreComponent } from './client-store/client-store.component';
import { ClientsIndexComponent } from './clients-index/clients-index.component';

export const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full'},
  { path: 'index', component: ClientsIndexComponent },
  { path: 'edit/:sku', component: ClientEditComponent },
  { path: 'store', component: ClientStoreComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule {}