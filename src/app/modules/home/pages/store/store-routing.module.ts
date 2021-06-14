import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreIndexComponent } from './store-index/store-index.component';

export const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full'},
  { path: 'index', component: StoreIndexComponent }
//   { path: 'products/:id', component:  productseditcompo},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule {}