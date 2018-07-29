import { Component, OnInit } from '@angular/core';
import {RolesService} from "../../../services/roles.service";
import {Role} from "../../interfaces/role.interface";

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  roles:any;
  rolSeleccionado: Role;



  constructor(private _roleService: RolesService) {
    this.rolSeleccionado = this._roleService.initNewRol();
    this.getAll();
  }

  ngOnInit() {}

  getAll(){
    this._roleService.getRoles()
      .subscribe( data => {
        debugger;
        this.roles = data;
        this.rolSeleccionado = this.roles[0];
      }, error => {
        console.error(error);
      });
  }



}
