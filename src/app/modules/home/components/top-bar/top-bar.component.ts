
import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/User_service';
import { HistoryService } from 'src/app/shared/services/History_service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  providers: [
    UserService, 
    HistoryService
  ]
})
export class TopBarComponent implements OnInit {
  user_image_profile = "https://picsum.photos/40";
  identity;
  token;
  history = {};
  date = new Date;

  constructor(
		private router: Router, 
    private _userService: UserService,
    private _historyService: HistoryService,
  ) { 
  }

  ngOnInit() {
    this.identity = JSON.parse(localStorage.getItem('identity'));
    this.token = localStorage.getItem('session');
  }

  user_info() {
    if(document.getElementById("user-info")){
      document.getElementById("user-info").classList.toggle("drop-content-transition");
      document.getElementById("user-drop").classList.toggle("back-toggle");
    }
  }

  collapse_sidebar(){
    if(document.getElementById("sidebar"))
      document.getElementById("sidebar").classList.toggle("toggle-contrait");
    
    if(document.getElementById('content').classList.contains('content-short')) 
      document.getElementById('content').classList.remove('content-short');
    else document.getElementById('content').classList.add('content-short');
  }

  logOut(){
    this.date = new Date();
        
    this.history = 
    { 
      "id_user": this.identity.id, 
      "description": "Se cerro sesion",
      "date": this.date.getFullYear() +"-"+ this.date.getMonth() +"-"+this.date.getDay(),
      "time": this.date.getHours() +":"+this.date.getMinutes()+":"+this.date.getSeconds()
    };
    this._historyService.create(this.history,this.token).subscribe();
        
    this._userService.logout(this.token).subscribe(
      response =>{
        console.log(response);
        localStorage.removeItem('session');
        localStorage.removeItem('identity');
        this.router.navigate(['/auth/login']);
      },
      error => {
        console.log(error);
      }
    )
  }
}
