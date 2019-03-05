import {Component, OnInit} from '@angular/core';
import {User} from '../../../interfaces/user.interface';
import {UsersService} from '../../../../services/users.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RolesService} from '../../../../services/roles.service';
import {Role} from '../../../interfaces/role.interface';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  constructor(private _userService: UsersService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private _rolesService: RolesService) {
    this.activatedRoute.params.subscribe(parametros => {
      console.log(parametros);

      debugger;
      this.id = parametros['id'];
      this.editPass = parametros['changepass'] ? parametros['changepass'] : false;
      this.user = this._userService.initNewUser();

      if (this.id != 'nuevo') {
        this._userService.get(this.id).subscribe(data => {
          this.user = data;
        });
      }
      this.obtenerRoles();
    });
  }

  id: string;
  user: User;
  pass = '';
  repassword = '';
  rolesDisponibles: Role[];
  userForm: FormGroup;
  editPass = false;


  account_validation_messages = {
    'firstName': [
      {type: 'required', message: 'Username is required'},
      {type: 'minlength', message: 'Username must be at least 5 characters long'},
      {type: 'maxlength', message: 'Username cannot be more than 25 characters long'},
      {type: 'pattern', message: 'Your username must contain only numbers and letters'},
      {type: 'validUsername', message: 'Your username has already been taken'}
    ],
    'lastName': [
      {type: 'required', message: 'Lastname is required'},
      {type: 'minlength', message: 'Lastname must be at least 5 characters long'},
      {type: 'maxlength', message: 'Lastname cannot be more than 25 characters long'},
      {type: 'pattern', message: 'Your username must contain only numbers and letters'},
      {type: 'validLastname', message: 'Your username has already been taken'}
    ],
    'email': [
      {type: 'required', message: 'Email is required'},
      {type: 'pattern', message: 'Enter a valid email'}
    ],
    'confirm_password': [
      {type: 'required', message: 'Confirm password is required'},
      {type: 'areEqual', message: 'Passwords should be equals'}
    ],
    'password': [
      {type: 'required', message: 'Password is required'},
      {type: 'minlength', message: 'Password must be at least 5 characters long'},
      {type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number'}
    ],
    'terms': [
      {type: 'pattern', message: 'You must accept terms and conditions'}
    ]
  };


  ngOnInit() {
  }


  onSubmit() {
    this.user.pass = this.pass;
    if (this.id == 'nuevo') {
      this.user.id = null;
      this._userService.newUser(this.user).subscribe((res: Response) => {
        this.router.navigate(['users']);
      }, error => {
        console.log(error);
      });
    } else {
      this._userService.updateUser(this.user).subscribe((res: Response) => {
        this.router.navigate(['users']);
      }, error => {
        console.log(error);
      });
    }
  }


  obtenerRoles() {
    this._rolesService.getRoles().subscribe(roles => {
      this.rolesDisponibles = roles;
    });
  }

  onNotify(newRole: Role): void {
    debugger;
    this.user.roles[0] = newRole;
  }


  getValidationMessage(array, type) {
  /*for (var i = 0; i < array.length; i++) {
    if (array[i]["type"] == type) {
      return array[i]["message"];
    }
  }
  return null;*/
    return array.find(function (obj) { return obj.type === type; }).message;
}


  getError(err: any) {
    debugger;
    return err;
  }
}
