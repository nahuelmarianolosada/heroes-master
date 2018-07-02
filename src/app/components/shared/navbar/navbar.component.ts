import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import {AuthService} from "../../../../services/auth.service";
import {showWarningOnce} from "tslint/lib/error";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


 /* loguedUser: any;*/

  constructor(private router:Router, private authService: AuthService) { }

  ngOnInit() {
    /*this.loguedUser = this.getLogedUser();*/
  }



  buscarHeroe(termino:string){
    this.router.navigate(['/buscar', termino]);
  }


  getLogedUser(){
    return this.authService.getLogedUser();
  }

}
