import { Component, OnInit } from '@angular/core';
import {User} from "../../interfaces/user.interface";
import {Router} from "@angular/router";
import {UsersService} from "../../../services/users.service";
import {tryCatch} from "rxjs/util/tryCatch";
import {tryParse} from "selenium-webdriver/http";

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
  filter: any = '';

  constructor(private _usersService: UsersService, private _router: Router) {
    console.log('Constructor Users');
    this.getAll();
    this.userSelected = this.initNewUser();

  }


  // Ya está terminada la carga
  ngOnInit() {
    this.userSelected = this.initNewUser();
  }



  verUser(idx: number) {
    this._router.navigate(['/user', idx]);
  }



  confirmDelUser(user: User){
    this.userSelected = user;
  }


   initNewUser(user?:any){
    return user ? {
      id: user.id,
      firstName:user.firstName,
      lastName:user.lastName,
      email: user.email,
      password: ""
    } :
     {
      id:0,
      firstName:"",
      lastName:"",
      email: "",
      password: ""
    }
  }





  getAll(){
    this._usersService.getUsers()
      .subscribe( data => {
        this.users = data;
        this.loading = false;
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

        this.userSelected = this.initNewUser(res);

       /* this.userSelected = {
          userId:res.userId,
          firstName:res.firstName,
          lastName:res.lastName,
          lastUpdate: res.lastUpdate,
          filmInfo: res.filmInfo
        };*/
      }
    );
  }
}
