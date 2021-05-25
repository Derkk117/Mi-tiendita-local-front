import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from './core/guards/no-auth.guard';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';

const routes: Routes = [
	{ path: '', redirectTo: '/auth/welcome', pathMatch: 'full' },
	{ path: '', component: ContentLayoutComponent, canActivate: [NoAuthGuard],
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
			{
				path: 'store',
				loadChildren: () => import('./modules/home/pages/store/store.module').then(m => m.HomeModule)
			},
			{
				path: 'deliveries',
				loadChildren: () => import('./modules/home/pages/deliveries/deliveries.module').then(m => m.HomeModule)
			},
			{
				path: 'cortes',
				loadChildren: () => import('./modules/home/pages/cortes/cortes.module').then(m => m.HomeModule)
			},			{
				path: 'history',
				loadChildren: () => import('./modules/home/pages/histories/histories.module').then(m => m.HomeModule)
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
		redirectTo: '/auth/login',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule { };