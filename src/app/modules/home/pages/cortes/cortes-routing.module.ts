import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CortesComponent } from '../cortes/cortes/cortes.component';
import { CortesCreateComponent } from './cortes-create/cortes-create.component';

export const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full'},
  { path: 'index', component: CortesComponent},
  { path: 'create', component: CortesCreateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CortesRoutingModule { }
