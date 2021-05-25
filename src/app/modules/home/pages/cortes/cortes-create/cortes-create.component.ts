import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cortes-create',
  templateUrl: './cortes-create.component.html',
  styleUrls: ['./cortes-create.component.scss']
})
export class CortesCreateComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goBack(){
    this.router.navigate(['cortes/']);
  }

}
