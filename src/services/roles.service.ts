import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, HttpModule, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { TokenStorage } from "../app/token.storage";
import { Role } from "../app/interfaces/role.interface";
import {environment} from "../environments/environment.qa";

@Injectable()
export class RolesService {
  rolesURL:string = environment.apiBase + "/roles";
  headers: Headers;
  options: RequestOptions;

  roles: any[] = [];

  constructor(private http: Http, private tokenStorage: TokenStorage) {
    this.headers = new Headers({ 'Content-Type': 'application/json', 'withCredentials': 'true','Access-Control-Allow-Origin': 'true' });
    console.log(JSON.parse(localStorage.getItem('AuthToken')).token);
    this.headers.append('Authorization' , JSON.parse(localStorage.getItem('AuthToken')).token);
    this.options = new RequestOptions( { headers: this.headers } );
    console.log('Servicio listo para usar');
  }




  newRole(role: Role){
    return this.http.post(this.rolesURL, role, this.options)
      .map( (res: Response) => res.json() )
      .catch(this.handleErrorObservable);
  }





  updateRole(role: Role){
    return this.http.put(this.rolesURL, role, this.options)
      .map( res =>
        res.json()
      ).catch(this.handleErrorPromise);
  }



  deleteRole(role: Role){

    return this.http.delete(this.rolesURL + "/" + role.id, this.options)
      .map( res =>
        res.json()
      ).catch(this.handleErrorPromise);
  }



  getRoles() {
    return this.http.get(this.rolesURL, this.options)
      .map( res =>
        res.json()
      ).catch(this.handleErrorPromise);
  }



  get(id:string) {
    return this.http.get(this.rolesURL + "/" + id, this.options)
      .map( res =>
        res.json()
      ).catch(this.handleErrorPromise);
  }



  getInfo(role:Role) {
    return this.http.get(this.rolesURL + "/info/" + role.id, this.options)
      .map( res =>
        res.json()
      ).catch(this.handleErrorPromise);
  }

  initNewRol(rol?:any){
    debugger;
    return rol ? {
      id: rol.id,
      name:rol.firstName,
      key:rol.lastName,
      img:rol.img
    } :
      {
        id:0,
        name:"Seleccione un rol",
        key:null,
        img:""
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
