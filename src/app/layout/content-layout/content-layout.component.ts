import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-content-layout',
	templateUrl: './content-layout.component.html',
	styleUrls: ['./content-layout.component.scss']
})

export class ContentLayoutComponent implements OnInit {
	public token = "";

	constructor(
		private router: Router,  
	){

	}

	ngOnInit(): void {
		this.token = (localStorage.getItem('session')) ? localStorage.getItem('session') : null;
		if(this.token == null || this.token == "") this.router.navigate(['/auth/login']);
	}
}
