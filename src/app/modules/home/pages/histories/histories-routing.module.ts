import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoriesIndexComponent } from './histories-index/histories-index.component';

export const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full'},
  { path: 'index', component: HistoriesIndexComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoriesRoutingModule {}