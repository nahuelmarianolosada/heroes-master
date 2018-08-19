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
  config = {
    displayKey:"description", //if objects array passed which key to be displayed defaults to description,
    search:true //enables the search plugin to search in the list
  }



  constructor(private _roleService: RolesService) {
    this.getAll();
    this.rolSeleccionado = this._roleService.initNewRol();
  }

  ngOnInit() {}

  getAll(){
    this._roleService.getRoles()
      .subscribe( data => {
        this.roles = data;
        this.rolSeleccionado = this.roles[0];
        debugger;
      }, error => {
        console.error(error);
      });
  }

  public selectionChanged(event){
    debugger;
  }


}
