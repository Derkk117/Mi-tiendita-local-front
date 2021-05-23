import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuppliersIndexComponent } from './suppliers-index/suppliers-index.component';
import { SuppliersCreateComponent } from './suppliers-create/suppliers-create.component';
import { SuppliersEditComponent } from './suppliers-edit/suppliers-edit.component';

export const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full'},
  { path: 'index', component: SuppliersIndexComponent },
  { path: 'create', component: SuppliersCreateComponent },
  { path: 'edit/:slug', component: SuppliersEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliersRoutingModule {}