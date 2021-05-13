import { Component, OnInit, AfterViewInit, OnDestroy, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, AfterViewInit {
  title = 'Mi-tiendita-local-front';
  width = 0;
  constructor(public router: Router, private renderer: Renderer2) {  }
  ngOnInit(){
    if(document.getElementById('sidebar'))
      this.width = document.getElementById('sidebar').clientWidth;
  }

  onResized($event){
    if(document.getElementById('sidebar'))
      this.width = document.getElementById('sidebar').clientWidth;
  }

  ngAfterViewInit() {
    let loader = this.renderer.selectRootElement('#loader');
    this.renderer.setStyle(loader, 'display', 'none');
  }
}
