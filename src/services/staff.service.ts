import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, HttpModule, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { TokenStorage } from "../app/token.storage";
import { Staff } from "../app/interfaces/staff.interface";
import {RolesService} from "./roles.service";
import {environment} from "../environments/environment";

@Injectable()
export class StaffService {

  staffURL:string = environment.apiBase + "/staff";
  headers: Headers;
  options: RequestOptions;

 /* users: any[] = [];*/

  constructor(private http: Http, private tokenStorage: TokenStorage, private _roleService: RolesService) {
    this.headers = new Headers({ 'Content-Type': 'application/json', 'withCredentials': 'true','Access-Control-Allow-Origin': 'true' });
    console.log(JSON.parse(localStorage.getItem('AuthToken')).token);
    this.headers.append('Authorization' , JSON.parse(localStorage.getItem('AuthToken')).token);
    this.options = new RequestOptions( { headers: this.headers } );
    console.log('Servicio listo para usar');
  }




  newStaff(staff: Staff){
    return this.http.post(this.staffURL, staff, this.options)
      .map( (res: Response) => res.json() )
      .catch(this.handleErrorObservable);
  }





  updateStaff(staff: Staff){
    return this.http.put(this.staffURL, staff, this.options)
      .map( res =>
        res.json()
      ).catch(this.handleErrorPromise);
  }



  deleteStaff(staff: Staff){

    return this.http.delete(this.staffURL + "/" + staff.staffId, this.options)
      .map( res =>
        res.json()
      ).catch(this.handleErrorPromise);
  }



  getStaff() {
    return this.http.get(this.staffURL, this.options)
      .map( res =>
        res.json()
      ).catch(this.handleErrorPromise);
  }



  get(email:string) {
    return this.http.get(this.staffURL + "/email" + email, this.options)
      .map( res =>
        res.json()
      ).catch(this.handleErrorPromise);
  }



  getInfo(staff:Staff) {
    return this.http.get(this.staffURL + "/info/" + staff.staffId, this.options)
      .map( res =>
        res.json()
      ).catch(this.handleErrorPromise);
  }

  initNewStaff(staff?:any){
    debugger;
    return staff ? {
      id: staff.staffId,
      firstName:staff.firstName,
      lastName:staff.lastName,
      email: staff.email,
      password: "",
      roles: staff.roles
    } :
      {
        id:null,
        firstName:"",
        lastName:"",
        email: "",
        password: "",
        roles: [this._roleService.initNewRol()]
      }
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

