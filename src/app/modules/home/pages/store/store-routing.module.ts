import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreIndexComponent } from './store-index/store-index.component';
import { StoreEditComponent } from './store-edit/store-edit.component';
import { StoreCreateComponent} from './store-create/store-create.component';

export const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full'},
  { path: 'index', component: StoreIndexComponent },
  { path: 'edit', component: StoreEditComponent},
  { path: 'create', component: StoreCreateComponent}
//   { path: 'products/:id', component:  productseditcompo},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule {}