import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { LayoutModule } from './layout/Layout.module';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { LayoutModule } from './layout/Layout.module';
<<<<<<< HEAD
=======
import { DashboardComponent } from './modules/home/pages/dashboard/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
>>>>>>> origin/module-products
=======
import { DashboardComponent } from './modules/home/pages/dashboard/dashboard/dashboard.component';
import { SideBarComponent } from './modules/home/components/side-bar/side-bar.component';
>>>>>>> cc5a7d90a2b7886559e1414bff32ff3f0fd877d7

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SideBarComponent,
  ],
  imports: [
    AppRoutingModule, 
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,        
    LayoutModule,
<<<<<<< HEAD
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
=======
    MatButtonModule,    
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
>>>>>>> cc5a7d90a2b7886559e1414bff32ff3f0fd877d7
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
