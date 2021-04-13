import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Mi-tiendita-local-front';
  width = 0;
  
  ngOnInit(){
    this.width = document.getElementById('sidebar').clientWidth;
  }

  onResized($event){
    this.width = document.getElementById('sidebar').clientWidth;
  }

}
