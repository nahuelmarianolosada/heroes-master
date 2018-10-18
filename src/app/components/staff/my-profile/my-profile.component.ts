import { Component } from '@angular/core';
import { StaffService } from "../../../../services/staff.service";
import { ActivatedRoute } from "@angular/router";
import { TokenStorage } from "../../../token.storage";
import { Location } from '@angular/common';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {
  staff:any = {};

  constructor(private activatedRoute: ActivatedRoute,
              private _staffService: StaffService,
              private _tokenStorage:TokenStorage,
              private _location: Location) {
    debugger;
    this.activatedRoute.params.subscribe(
      params =>{
        debugger;
        console.log(params['email']);//Id que recibe como parametro GET

        this.staff = this._staffService.get(this.getLogedUser().email).subscribe(data => {
          debugger;
          this.staff = data;
        });
        //this.staff = StaffsService.getStaff(params['id']);
      }
    );
  }

  getLogedUser(){
    return JSON.parse(localStorage.getItem('AuthToken'));
    /*return this.loguedUser != null ? this.loguedUser : this.tokenStorage.getToken().token;*/
  }

  backClicked() {
    this._location.back();
  }

 /* verProfile(idx: number) {
    this._router.navigate(['/myProfile', this.getLogedUser().email]);
  }*/

}
