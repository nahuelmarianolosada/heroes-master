import {Component, HostListener, Input, OnInit} from '@angular/core';
import {User} from "../../../interfaces/user.interface";
import {UsersService} from "../../../../services/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RolesComponent} from "../../roles/roles.component";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  /*nuevo:boolean = false;*/
  id:string;

  user:User;
  repassword:string;


  /*rolesDisponibles:any[] = [];*/

  constructor(private _userService:UsersService,
              private router: Router,
              private activatedRoute:ActivatedRoute) {
    this.activatedRoute.params.subscribe(parametros => {
      console.log(parametros);
      debugger;
      this.id = parametros['id'];
      this.user = this._userService.initNewUser();
      /*this.rolesDisponibles = this._roleService.getRoles();*/

      if( this.id == "nuevo" ){
        /*this.rolesDisponibles = this._roleService.getRoles();*/
      }else{
        this._userService.get(this.id)
          .subscribe( data => {
            debugger;
            this.user = data;
          })
      }

    });
  }




  ngOnInit() {
  }




  guardar(){
    if(this.id == "nuevo"){
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





}
