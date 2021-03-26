/* MODULOS */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { LayoutModule } from './layout/Layout.module';

/* COMPONENTES */
import { AppComponent } from './app.component';
import { DashboardComponent } from './modules/home/pages/dashboard/dashboard/dashboard.component';
import { SideBarComponent } from './modules/home/components/side-bar/side-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SideBarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,    
    AppRoutingModule, 

    RouterModule,
    LayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
