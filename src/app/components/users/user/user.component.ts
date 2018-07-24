import { Component, OnInit } from '@angular/core';
import {User} from "../../../interfaces/user.interface";
import {UsersService} from "../../../../services/users.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  /*nuevo:boolean = false;*/
  id:string;

  user:User = {
    id:0,
    firstName:"",
    lastName:"",
    email:"",
    password:""
  };
  repassword:string;

  constructor(private _userService:UsersService,
              private router: Router,
              private activatedRoute:ActivatedRoute) {
    this.activatedRoute.params.subscribe(parametros => {
      console.log(parametros);
      debugger;
      this.id = parametros['id'];

      if( this.id == "nuevo" ){
        this.initNewUser();
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



  initNewUser(){
    this.user = {
      id:0,
      firstName:"",
      lastName:"",
      email:"",
      password:""
    }
    this.repassword ="";
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
