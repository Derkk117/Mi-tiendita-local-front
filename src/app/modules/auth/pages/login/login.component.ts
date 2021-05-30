import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/User_service';
import { StoreService } from 'src/app/shared/services/Store_service';
import { HistoryService } from 'src/app/shared/services/History_service';
import { identity } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    UserService,
    ToastrService,
    StoreService,
    HistoryService
  ]
})
export class LoginComponent implements OnInit {
  public email = "";
  public password ="";
  public token = "";
  public _login = true;
  public history = {};
  date = new Date();

  constructor(
    private _userService: UserService,
    private _storeService: StoreService,
    private _historyService: HistoryService,
    private router: Router,  
    private toastr: ToastrService
  ) { 

  }

  ngOnInit(): void {
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
              
              ///Registro en historial 
              this.date = new Date();
              this.history = 
              { 
                "id_user": JSON.parse(localStorage.getItem('identity')).id,
                "description": "Inicio de sesion",
                "date": this.date.getFullYear() +"-"+ (this.date.getMonth()+1) +"-"+this.date.getDate(),
                "time": this.date.getHours() +":"+this.date.getMinutes()+":"+this.date.getSeconds()
              };
              this._historyService.create(this.history,this.token).subscribe();
              ////Fin de registro en historial

              this.router.navigate(['dashboard']);
              this._storeService.getStore((JSON.parse(localStorage.getItem('identity'))).store_id,this.token).subscribe(
                response => {
                  localStorage.setItem('store',JSON.stringify(response));
                }      
              );
            },
            error =>{
              this.toastr.error(error.message, 'Error');
            }
          );
        },
        error => {
          this.toastr.error("Algo salió mal, intentalo de nuevo.", 'Error');
        }
      );
    }else 
      this.toastr.error("Debes llenar ambos campos", 'Error');
  }
}