import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/User_service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public email = "";
  public password ="";

  constructor(
    private _userService:  UserService,
    private router: Router,  
  ) { 

  }

  ngOnInit(): void {

  }

  login(){
    console.log("ok");
    if (this.email != "" && this.password != "") {
      this._userService.login(
        {username: this.email, password: this.password}).subscribe(
        response => {
          let token = response.access_token
          console.log(token);
          
          this.router.navigate(['dashboard']);
        },
        error => {
          console.log('error identity');
        }
      );
    }
  }

}

