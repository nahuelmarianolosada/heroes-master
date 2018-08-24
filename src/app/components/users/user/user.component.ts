import { Component, OnInit } from '@angular/core';
import { User } from "../../../interfaces/user.interface";
import { UsersService } from "../../../../services/users.service";
import { ActivatedRoute, Router } from "@angular/router";
import { RolesService } from "../../../../services/roles.service";
import { Role } from "../../../interfaces/role.interface";
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  id:string;
  user:User;
  firstName: String;
  repassword:string = "";
  rolesDisponibles: Role[];
  userForm: FormGroup;



  constructor( private _userService:UsersService,
              private router: Router,
              private activatedRoute:ActivatedRoute,
              private _rolesService: RolesService ) {
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




  onSubmit(){
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


  account_validation_messages = {
    'firstName': [
      { type: 'required', message: 'Username is required' },
      { type: 'minlength', message: 'Username must be at least 5 characters long' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters' },
      { type: 'validUsername', message: 'Your username has already been taken' }
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required' },
      { type: 'areEqual', message: 'Password mismatch' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 5 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    ],
    'terms': [
      { type: 'pattern', message: 'You must accept terms and conditions' }
    ]
  }
}
