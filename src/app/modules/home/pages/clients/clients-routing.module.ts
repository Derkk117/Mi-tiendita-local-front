import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsIndexComponent } from './clients-index/clients-index.component';

export const routes: Routes = [
  { path: '', component: ClientsIndexComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule {}