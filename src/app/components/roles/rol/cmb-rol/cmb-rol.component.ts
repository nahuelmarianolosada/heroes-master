import {Component, Input, OnInit} from '@angular/core';
import {Role} from "../../../../interfaces/role.interface";
import {RolesService} from "../../../../../services/roles.service";

@Component({
  selector: 'cmb-rol',
  templateUrl: './cmb-rol.component.html',
  styleUrls: ['./cmb-rol.component.css']
})
export class CmbRolComponent implements OnInit {

  @Input()
  roles:any;

  @Input()
  rolSeleccionado: Role;

  constructor(private _roleService: RolesService) { }

  /*@Input()*/
/*
  set setRolSeleccionado(rol: Role) {
    this.rolSeleccionado = (rol) || null;
  }

  get getRolSeleccionado(): Role { return this.rolSeleccionado; }*/


  ngOnInit() {
    /*this.rolSeleccionado = this._roleService.initNewRol();*/
    debugger;
    /*if(!this.roles) {this.getAll()};*/
  }

  getAll(){
    this._roleService.getRoles()
      .subscribe( data => {
        this.roles = data as Role[];
        debugger;
      }, error => {
        console.error(error);
      });
  }

  selectionChanged(event){

  }

}
