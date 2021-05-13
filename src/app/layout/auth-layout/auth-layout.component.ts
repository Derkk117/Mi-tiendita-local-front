import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {
  public email = "";
  public password ="";
  public token = "";
  public _login = true;

  constructor(
    private router: Router) { }

  ngOnInit(): void {
    this.token = (localStorage.getItem('session')) ? localStorage.getItem('session') : null;
    if(this.token != null && this.token != "") this.router.navigate(['/dashboard']);
  }

}
