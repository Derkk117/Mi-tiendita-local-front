import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landingPage',
  templateUrl: './landingPage.component.html',
  styleUrls: ['./landingPage.component.scss']
})
export class LandingPageComponent implements OnInit {

  public token = "";

  constructor(
    private router: Router,  
  ) { 
    this.token = (localStorage.getItem('session')) ? localStorage.getItem('session') : null;
    if(this.token != null && this.token != "") this.router.navigate(['/dashboard']);
  }

  ngOnInit(): void {
  }

}
