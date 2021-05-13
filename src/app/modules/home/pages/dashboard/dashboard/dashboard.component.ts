import { Component, OnInit } from '@angular/core';
// import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateStoreComponent } from '../create-store/create-store.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  identity;
  store;

  constructor() { }

  ngOnInit(): void {
    this.store = (localStorage.getItem('store')) ? JSON.parse(localStorage.getItem('store')) : null;

    if(this.store == null){
      this.createStore()
    }
  }

  createStore(){
    // const dialogRef = this.dialog.open(CreateStoreComponent,{
    //   width: '640px',disableClose: false 
    // });
  }
}