import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/User_service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    UserService,
    ToastrService,
  ]
})
export class LoginComponent implements OnInit {
  public email = "";
  public password ="";
  public token = "";
  public _login = true;

  constructor(
    private _userService: UserService,
    private router: Router,  
    private toastr: ToastrService
  ) { 

  }

  ngOnInit(): void {
    this.token = (localStorage.getItem('session')) ? localStorage.getItem('session') : null;
    if(this.token != null && this.token != "") this.router.navigate(['/dashboard']);
  }

  login(){
    if (this.email != "" && this.password != "") {
      this.toastr.info("Validando información...", 'Espera');
      this._userService.login(
        {username: this.email, password: this.password}).subscribe(
        response => {
          this.token = response.access_token
          localStorage.setItem('session', this.token);
          this._userService.getIdentity(this.token, this.email ).subscribe(
            response =>{
              this.toastr.success(':)', 'Bienvenido');
              localStorage.setItem('identity', JSON.stringify(response));
            },
            error =>{
              this.toastr.error(error.message, 'Error');
            }
          );
          this.router.navigate(['dashboard']);
        },
        error => {
          this.toastr.error("Algo salió mal, intentalo de nuevo.", 'Error');
        }
      );
    }else 
      this.toastr.error("Debes llenar ambos campos", 'Error');
  }
}

