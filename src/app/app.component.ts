import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Mi-tiendita-local-front';
  width = 0;
  constructor(public router: Router) {

  }
  ngOnInit(){
    if(document.getElementById('sidebar'))
      this.width = document.getElementById('sidebar').clientWidth;
  }

  onResized($event){
    if(document.getElementById('sidebar'))
      this.width = document.getElementById('sidebar').clientWidth;
  }
}
