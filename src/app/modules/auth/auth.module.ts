import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthRoutingModule } from './auth-routing.module';

import { CronJobsModule } from 'ngx-cron-jobs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LandingPageComponent } from './pages/landing_page/landingPage.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LandingPageComponent
  ],
  imports: [
    FlexLayoutModule,
    ReactiveFormsModule,
    CommonModule,
    AuthRoutingModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    CronJobsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right'
    })
  ],
  exports: [

  ]
})
export class AuthModule { }
