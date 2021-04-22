import { Component, Input, OnInit } from '@angular/core';

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
      icon: "local_convenience_store",
      name: "Dashboard",
      route: ""
    },
    {
      icon: "local_convenience_store",
      name: "Mi tienda",
      route: ""
    },
    {
      icon: "groups",
      name: "Clientes",
      route: ""
    },
    {
      icon: "local_cafe",
      name: "Productos",
      route: ""
    },
    {
      icon: "sell",
      name: "Ventas",
      route: ""
    },
    {
      icon: "connect_without_contact",
      name: "Proveedores",
      route: ""
    },
    {
      icon: "point_of_sale",
      name: "Cortes",
      route: ""
    },
    {
      icon: "check",
      name: "Entregas",
      route: ""
    },
    {
      icon: "menu",
      name: "Historial",
      route: ""
    }
  ];

  constructor() { }

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
  }
}
