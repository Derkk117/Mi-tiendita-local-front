import { ChangeDetectorRef } from '@angular/core';
import { Component, OnDestroy } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {Router} from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})

export class SideBarComponent implements OnDestroy{

  mobileQuery: MediaQueryList;

  fillerNav = [
    {name:"Ventas", route:"Ventas", icon:"receipt"},
    {name:"Articulos", route:"Articulos", icon:"shopping_cart"},
    {name:"Inventarios", route:"Inventarios", icon:"app_registration"},
    {name:"Clientes", route:"Clientes", icon:"supervisor_account"},
    {name:"Proveedores", route:"Proveedores", icon:"supervised_user_circle"},
    {name:"Cortes", route:"Cortes", icon:"shuffle"},
    {name:"Entregas", route:"Entregas", icon:"airport_shuttle"},
    {name:"Configuracion", route:"Configuracion", icon:"account_circle"},
  ]
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router:Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
    
  shouldRun = true;

  navegar(url:string)
  {
    this.router.navigate([url]);
  }
}