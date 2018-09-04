import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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

  @Output() notify: EventEmitter<Role> = new EventEmitter<Role>();

  constructor(private _roleService: RolesService) {
  }


  ngOnInit() {
    debugger;
    console.log(this.rolSeleccionado);
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
    debugger;
    this.rolSeleccionado = event;
    this.notify.emit(this.rolSeleccionado);
    console.log(this.rolSeleccionado);
  }

}
