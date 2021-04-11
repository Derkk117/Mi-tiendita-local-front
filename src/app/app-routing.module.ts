import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from './core/guards/no-auth.guard';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { SalesIndexComponent} from '../app/modules/home/pages/sales/sales-index/sales-index.component';
const routes: Routes = [
	{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
	{
		path: '',
		component: ContentLayoutComponent,
		canActivate: [NoAuthGuard],
		children: [			
			{
				path: 'dashboard',
				loadChildren: () => import('./modules/home/pages/dashboard/dashboard.module').then(m => m.HomeModule)
			},
			{
				path: 'products',
				loadChildren: () => import('./modules/home/pages/products/products.module').then(m => m.HomeModule)
			},
			{
				path: 'clients', 
				loadChildren: () => import('./modules/home/pages/clients/clients.module').then(m => m.HomeModule)
			},
			{
				path: 'suppliers',
				loadChildren: () => import('./modules/home/pages/suppliers/suppliers.module').then(m => m.HomeModule)
			},
			{
				path: 'sales',
				loadChildren: () => import('./modules/home/pages/sales/sales.module').then(m => m.HomeModule)
			},
		]
	},
	{
		path: 'auth',
		component: AuthLayoutComponent,
		loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
	},
	{
		path: '**',
		redirectTo: '/dashboard',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule { };