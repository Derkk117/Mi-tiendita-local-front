import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  user_image_profile = "https://picsum.photos/40";

  constructor() { }

  ngOnInit(): void {
  }

  user_info() {
    document.getElementById("user-info").classList.toggle("drop-content-transition");
    document.getElementById("user-drop").classList.toggle("back-toggle");
  }

  collapse_sidebar(){
    document.getElementById("sidebar").classList.toggle("toggle-contrait");
  }
}
