import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {StaffService} from "../../../services/staff.service";
import {Observable} from "rxjs/Observable";
import {RolesService} from "../../../services/roles.service";
import {Staff} from "../../interfaces/staff.interface";

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  staff: Observable<any>;

  constructor(private _staffService: StaffService, private _router: Router, private _roleService: RolesService) {
    console.log('Constructor');
  }


  // Ya está terminada la carga
  ngOnInit() {
    this._staffService.getStaff().subscribe(data =>{
      debugger;
      this.staff = data
    });
  }

  initNewStaffUser(staffUser?:any){
    return staffUser ? {
      staffId: staffUser.staffId,
      firstName:staffUser.firstName,
      lastName:staffUser.lastName,
      email: staffUser.email,
      storeId: staffUser.storeId,
      active: staffUser.active,
      username: staffUser.username,
      password: staffUser.password,
      lastUpdate: staffUser.lastUpdate,
      picture: staffUser.picture,
      roles: staffUser.roles
    } :
      {
        staffId:null,
        firstName:"",
        lastName:"",
        email: "",
        storeId: "",
        active: false,
        username: "",
        password: "",
        lastUpdate: new Date(),
        picture: "",
        roles: [this._roleService.initNewRol()]
      }
  }


  verStaffUser(idx: number) {
    this._router.navigate(['/staff', idx]);
  }


  changePass(idx: number){
    this._router.navigate(['/staff', idx, {changepass: true }]);
  }


  confirmDelUser(staff: Staff){
    /*this.staffSelected = user;*/
  }


  private handleErrorObservable (error: Response | any) {
    debugger;
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
  private handleErrorPromise (error: Response | any) {
    debugger;
    console.error(error.statusText || error);
    return Promise.reject(error.status || error);
  }

}
