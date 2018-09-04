import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {User} from "../../interfaces/user.interface";
import {Router} from "@angular/router";
import {UsersService} from "../../../services/users.service";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any[] = [];
  userSelected: User;
  p: number = 1; //paginator
  loading: boolean = true;
  error : string;
  filter: any = '';

  constructor(private _usersService: UsersService, private _router: Router) {
    console.log('Constructor Users');
    this.getAll();
    this.userSelected = this._usersService.initNewUser();

  }


  // Ya está terminada la carga
  ngOnInit() {
  }



  verUser(idx: number) {
    this._router.navigate(['/user', idx]);
  }


  changePass(idx: number){
    this._router.navigate(['/user', idx, {changepass: true }]);
  }


  confirmDelUser(user: User){
    this.userSelected = user;
  }


  getAll(){
    this._usersService.getUsers()
      .subscribe( data => {
        debugger;
        this.users = data;
        this.loading = false;
      }, error => {
        this.loading = false;
        this.error = error;
      });
  }



  delUser(user: User){
    this._usersService.deleteUser(user).subscribe(res  =>
      {  this.getAll(); this._router.navigate(['users'])}
    );
  }


  viewInfo(user: User){
    this._usersService.getInfo(user).subscribe(res  =>
      {
        this.userSelected = this._usersService.initNewUser(res);
      }
    );
  }
}
