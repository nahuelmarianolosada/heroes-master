import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, HttpModule, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { TokenStorage } from "../app/token.storage";
import { Staff } from "../app/interfaces/staff.interface";
import { RolesService } from "./roles.service";
import { environment } from "../environments/environment";
import {StoreService} from "./store.service";

@Injectable()
export class StaffService {

  staffURL:string = environment.apiBase + "/staff";
  headers: Headers;
  options: RequestOptions;

  constructor(private http: Http,
              private tokenStorage: TokenStorage,
              private _roleService: RolesService,
              private _storeService: StoreService) {
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
    return this.http.get(this.staffURL + "/findByEmail/" + email, this.options)
     .map( res => res.json())
     .catch(this.handleErrorPromise);
   /* return this.http.post(this.staffURL+ "/findByEmail", {"email": email}, this.options)
      .map( (res: Response) => res.json() )
      .catch(this.handleErrorObservable);*/
  }



  getInfo(staff:Staff) {
    return this.http.get(this.staffURL + "/info/" + staff.staffId, this.options)
      .map( res =>
        res.json()
      ).catch(this.handleErrorPromise);
  }

  getInfoById(staffId:number) {
    return this.http.get(this.staffURL + "/" + staffId, this.options)
      .map( res =>
        res.json()
      ).catch(this.handleErrorPromise);
  }

  initNewStaff(staff?:any){
    debugger;
    return staff ? {
      staffId: staff.staffId,
      firstName:staff.firstName,
      lastName:staff.lastName,
      email: staff.email,
      store: staff.storeId,
      active: staff.active,
      username: staff.username,
      password: "",
      lastUpdate: staff.lastUpdate,
      picture: staff.picture,
      roles: staff.roles
    } :
      {
        staffId:null,
        firstName:"",
        lastName:"",
        email: "",
        store: null,
        active: false,
        username: "",
        password: "",
        lastUpdate: null,
        picture: "",
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

