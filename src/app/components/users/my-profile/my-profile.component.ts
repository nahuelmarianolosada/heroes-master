import {Component} from '@angular/core';
import {StaffService} from "../../../../services/staff.service";
import {ActivatedRoute} from "@angular/router";
import {TokenStorage} from "../../../token.storage";
import {Location} from '@angular/common';
import {UsersService} from "../../../../services/users.service";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {
  user: any = {};

  constructor(private activatedRoute: ActivatedRoute,
              private _userService: UsersService,
              private _tokenStorage: TokenStorage,
              private _location: Location) {
    debugger;
    this.activatedRoute.params.subscribe(
      params => {
        console.log(params['email']);//Id que recibe como parametro GET
        this.user = this._userService.getByEmail(this.getLogedUser().email).subscribe(data => {
          debugger;
          this.user = data;
        });
      }
    );
  }

  getLogedUser() {
    return JSON.parse(localStorage.getItem('AuthToken'));
  }

  backClicked() {
    this._location.back();
  }

}
