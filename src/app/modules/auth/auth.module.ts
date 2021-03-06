import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PaginaComponent } from './pages/pagina/pagina.component';


@NgModule({
  declarations: [
    LoginComponent, 
    RegisterComponent, 
    PaginaComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    RouterModule,
    MatIconModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass :'toast-top-right'
    })
  ],
  exports: [

  ]
})
export class AuthModule { }
