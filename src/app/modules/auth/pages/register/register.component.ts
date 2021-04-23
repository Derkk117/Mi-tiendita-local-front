import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, state } from '@angular/animations';
import { User } from '../../../../shared/models/User_model';
import { Address } from 'src/app/shared/models/Address_model';
import { Store } from 'src/app/shared/models/Store_model';
import { UserService } from 'src/app/shared/services/User_service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers:[UserService],
  animations: [
    trigger('enterState', [
      state('void', style({
        transform: 'translateX(100%)',
        opacity: 0
      })),
      transition(':enter', [
        animate(300, style({
          transform: 'translateX(0)',
          opacity: 1
        }))
      ])
    ])
  ]
})

export class RegisterComponent implements OnInit {

  public user;
  public userAddress;
  public store;
  public storeAddress;
  public retypePassword = "";
  public token = "";

  constructor(
    private _userService: UserService,
    private router: Router
  ) {
    this.user = new User(null, "", "", "", "", null, null);
    this.userAddress = new Address(null, "", "", "", "", "", "", "", "");
    this.storeAddress = new Address(null, "", "", "", "", "", "", "", "");
    this.store = new Store(null, null, "", "", "", null, "");
  }

  ngOnInit(): void {
    this.token = (localStorage.getItem('session')) ? localStorage.getItem('session') : null;
    if(this.token != null && this.token != "") this.router.navigate(['/dashboard']);
  }

  signUp(){
    // agregar un if para checar que el email no exista en la base de datos.

    if(this.user.name != "" && this.user.last_name != "" && this.user.email != "" && this.user.password != "" && this.retypePassword == this.user.password){
      this._userService.signUp(this.user).subscribe(
        response =>{
          this._userService.login(
            {username: this.user.email, password: this.user.password}).subscribe(
            response => {
              this.token = response.access_token
              localStorage.setItem('session', this.token);
              this._userService.getIdentity(this.token, this.user.email).subscribe(
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
        },
        error =>{

        }
      )
    }
  }
}
