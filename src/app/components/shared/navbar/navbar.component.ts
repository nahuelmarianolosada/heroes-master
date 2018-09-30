import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import {AuthService} from "../../../../services/auth.service";
import {showWarningOnce} from "tslint/lib/error";
import {TokenStorage} from "../../../token.storage";
import {stringify} from "@angular/core/src/util";
import {current} from "codelyzer/util/syntaxKind";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  loguedUser: any;

  constructor(private router:Router, private authService: AuthService, private tokenStorage: TokenStorage) { }

  ngOnInit() {

    this.loguedUser = JSON.parse(localStorage.getItem('AuthToken'));
    /*this.currentUser = this.loguedUser == null ? null : window.sessionStorage.getItem("AuthToken");*/
    /*console.log("Usuario actual Logueado : " + this.loguedUser.token.email + " " + this.loguedUser.token.role);*/
  }



  buscarHeroe(termino:string){
    this.router.navigate(['/buscar', termino]);
  }


  getLogedUser(){
    return JSON.parse(localStorage.getItem('AuthToken'));
    /*return this.loguedUser != null ? this.loguedUser : this.tokenStorage.getToken().token;*/
  }


  isAdmin(){
    return this.getLogedUser().role[0] == "ROLE_ADMIN" ? true : false;
  }


  verProfile(){
    debugger;
    var email = this.getLogedUser().email;
    this.router.navigate(['myProfile', email]);
  }



  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
