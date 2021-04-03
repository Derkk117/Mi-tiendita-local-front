import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from './core/guards/no-auth.guard';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { SideBarComponent } from './modules/home/components/side-bar/side-bar.component';

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
			{	//Direccion de SIDE-BAR
				path: 'sideBar', component: SideBarComponent
			},
			{
				path: 'suppliers',
				loadChildren: () => import('./modules/home/pages/suppliers/suppliers.module').then(m => m.HomeModule)
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