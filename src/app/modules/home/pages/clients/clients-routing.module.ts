import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsIndexComponent } from './clients-index/clients-index.component';

export const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full'},
  { path: 'index', component: ClientsIndexComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule {}