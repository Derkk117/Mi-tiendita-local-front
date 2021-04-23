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
      icon: "local_convenience_store",
      name: "Dashboard",
      route: "dashboard"
    },
    {
      icon: "local_convenience_store",
      name: "Mi tienda",
      route: "store"
    },
    {
      icon: "groups",
      name: "Clientes",
      route: "clients"
    },
    {
      icon: "local_cafe",
      name: "Productos",
      route: "products"
    },
    {
      icon: "sell",
      name: "Ventas",
      route: "sales"
    },
    {
      icon: "connect_without_contact",
      name: "Proveedores",
      route: "suppliers"
    },
    {
      icon: "point_of_sale",
      name: "Cortes",
      route: "cutoffs"
    },
    {
      icon: "check",
      name: "Entregas",
      route: "deliveries"
    },
    {
      icon: "menu",
      name: "Historial",
      route: "history"
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
