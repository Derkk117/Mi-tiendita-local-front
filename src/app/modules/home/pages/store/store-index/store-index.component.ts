import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store-index',
  templateUrl: './store-index.component.html',
  styles: [`
   .container{
    width: 45%;
    margin: 1rem auto;
    box-shadow: -1px 3px 66px 0px rgba(0,0,0,0.75);
    padding: 1rem;
    border-radius: 10px;
   } 

   mat-form-field{
    font-size: 14px;
    width: 100%;
    padding: 1rem;
    margin: 1rem auto;
    border: 1px;
    border-radius: 10px;
   }

   button{
    color: #FFFFFF;
    background-color: #326273;
   }

   .logo{
    border: 1px;
    border-radius: 10px;
   }

   img{
    border: 5px;
    border-style: solid;
    border-radius: 10px;
    border-color: #808080;
  
   }

  `]
})
export class StoreIndexComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
