import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CronJob } from 'cron';
import * as AOS from 'aos';

@Component({
  selector: 'app-landingPage',
  templateUrl: './landingPage.component.html',
  styleUrls: ['./landingPage.component.scss']
})
export class LandingPageComponent implements OnInit {
  cronJob: CronJob;
  public token = "";
  content1 = true;
  content2 = false;
  content3 = false;
  content4 = false;

  constructor(
    private router: Router,  
  ) { 
    this.token = (localStorage.getItem('session')) ? localStorage.getItem('session') : null;
    if(this.token != null && this.token != "") this.router.navigate(['/dashboard']);
    this.cronJob = new CronJob('*/12 * * * * *', async () => {
      try {
        if(this.content1 == true){
          this.content1 = false;
          this.content2 = true;
        }
        else if(this.content2 == true){
          this.content2 = false;
          this.content3 = true;
        }
        else if(this.content3 == true){
          this.content3 = false;
          this.content4 = true;
        }
        else if(this.content4 == true){
          this.content4 = false;
          this.content1 = true;
        }
      } catch (e) {
        console.error(e);
      }
    });

  }

  ngOnInit() {
    AOS.init();
    // Start job
    if (!this.cronJob.running) {
      console.log("ok");
      this.cronJob.start();
    }
  }
}
