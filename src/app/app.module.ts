import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutModule } from './layout/Layout.module';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { AngularResizedEventModule } from 'angular-resize-event';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopBarComponent } from './modules/home/components/top-bar/top-bar.component';
import { SideBarComponent } from './modules/home/components/side-bar/side-bar.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AppComponent } from './app.component';
import { SalesEditComponent } from './modules/home/pages/sales/sales-edit/sales-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    SideBarComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
    AngularResizedEventModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
