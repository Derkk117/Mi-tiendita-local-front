import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './content-layout/content-layout.component';

@NgModule({
  declarations: [
    AuthLayoutComponent,
    ContentLayoutComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
  ],
  exports:[
    AuthLayoutComponent,
    ContentLayoutComponent,
  ]
})
export class LayoutModule { }