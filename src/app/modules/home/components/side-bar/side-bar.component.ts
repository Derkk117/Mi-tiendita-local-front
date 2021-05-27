import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  @Input() size: number;
  width = 0;
  active = "Dashboard";
  refs = [
    {
      icon: "add_chart",
      name: "Dashboard",
      route: "dashboard", title:"Dashboard"
    },
    {
      icon: "add_business",
      name: "Mi tienda",
      route: "store", title:"Mi Tienda"
    },
    {
      icon: "group",
      name: "Clientes",
      route: "clients" , title:"Clientes"
    },
    {
      icon: "playlist_add_check",
      name: "Productos",
      route: "products" , title:"Productos"
    },
    {
      icon: "point_of_sale",
      name: "Ventas",
      route: "sales" , title:"Ventas"
    },
    {
      icon: "groups",
      name: "Proveedores",
      route: "suppliers", title:"Proveedores"
    },
    {
      icon: "restore_page",
      name: "Cortes",
      route: "cortes", title:"Cortes"
    },
    {
      icon: "inventory",
      name: "Entregas",
      route: "deliveries", title:"Entregas"
    },
    {
      icon: "receipt_long",
      name: "Historial",
      route: "history", title:"Historial"
    }
  ];

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.width = this.size;
    this.active = "Dashboard";
    if(document.getElementById("ref" + this.active))
      document.getElementById("ref" + this.active).classList.add("active"); 
  }

  ngOnChanges(changes: any) {
    this.width = this.size;
  }

  selectActive(element){
    if(document.getElementById("ref" + this.active)){
      document.getElementById("ref" + this.active).classList.remove("active"); 
      this.active = this.refs[element].name;
      document.getElementById("ref" + this.active).classList.add("active"); 
    }

    this.router.navigate([this.refs[element].route]);
  }
}
