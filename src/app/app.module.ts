import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LayoutModule } from './layout/Layout.module';
import { DashboardComponent } from './modules/home/pages/dashboard/dashboard/dashboard.component';
//import { SuppliersCreateComponent } from './modules/home/pages/suppliers/suppliers-create/suppliers-create.component';
//import { SuppliersIndexComponent } from './modules/home/pages/suppliers/suppliers-index/suppliers-index.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    //SuppliersCreateComponent,
    //SuppliersIndexComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    LayoutModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
