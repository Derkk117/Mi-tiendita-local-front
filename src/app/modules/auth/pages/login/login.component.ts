import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/User_service';
import { StoreService } from 'src/app/shared/services/Store_service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService,StoreService]
})
export class LoginComponent implements OnInit {
  public email = "";
  public password ="";
  public token = "";

  constructor(
    private _userService: UserService,
    private _storeService: StoreService,
    private router: Router,  
  ) { 

  }

  ngOnInit(): void {
    this.token = (localStorage.getItem('session')) ? localStorage.getItem('session') : null;
    if(this.token != null && this.token != "") this.router.navigate(['/dashboard']);
  }

  login(){
    if (this.email != "" && this.password != "") {
      this._userService.login(
        {username: this.email, password: this.password}).subscribe(
        response => {
          this.token = response.access_token
          localStorage.setItem('session', this.token);
          this._userService.getIdentity(this.token, this.email ).subscribe(
            response =>{
              localStorage.setItem('identity', JSON.stringify(response));
            },
            error =>{

            }
          );
          this.router.navigate(['dashboard']);
        },
        error => {
        }
      );
    }
  }
}

