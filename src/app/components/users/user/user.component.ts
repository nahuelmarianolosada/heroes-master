import { Component, OnInit } from '@angular/core';
import { User } from "../../../interfaces/user.interface";
import { UsersService } from "../../../../services/users.service";
import { ActivatedRoute, Router } from "@angular/router";
import { RolesService } from "../../../../services/roles.service";
import { Role } from "../../../interfaces/role.interface";
import { CmbRolComponent } from "../../roles/rol/cmb-rol/cmb-rol.component";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  id:string;

  user:User;
  repassword:string;


  rolesDisponibles: Role[];

  constructor(private _userService:UsersService,
              private router: Router,
              private activatedRoute:ActivatedRoute,
              private _rolesService: RolesService) {
    this.activatedRoute.params.subscribe(parametros => {
      console.log(parametros);
      this.id = parametros['id'];
      this.user = this._userService.initNewUser();

      if( this.id == "nuevo" ){

      }else{
        this._userService.get(this.id)
          .subscribe( data => {
            debugger;
            this.user = data;
            this.user.password="";
          });
      }
      this.obtenerRoles();
    });
  }




  ngOnInit() {
  }




  guardar(){
    debugger;
    if(this.id == "nuevo"){
      this.user.id = null;
      this._userService.newUser(this.user).subscribe((res: Response) => {
        this.router.navigate(['users']);
      }, error => {console.log(error)});
    }else{
      this._userService.updateUser(this.user).subscribe((res: Response) => {
        debugger;
        this.router.navigate(['users']);
      }, error => {debugger; console.log(error);});
    }
  }


  validarUsuario(usuario: User){
    return true;
  }

  obtenerRoles(){
    this._rolesService.getRoles().subscribe(roles => {
      this.rolesDisponibles = roles
    });
  }

  onNotify(newRole:Role):void {
    debugger;
    this.user.roles[0] = newRole;
  }


}
