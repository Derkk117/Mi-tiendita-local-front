import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  user_image_profile = "https://picsum.photos/40";
  identity = null;

  constructor(
		private router: Router, 
  ) { }

  ngOnInit(): void {
    this.identity = JSON.parse(localStorage.getItem('identity'));
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
    localStorage.removeItem('session');
  }
}
