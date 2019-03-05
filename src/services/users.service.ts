import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, HttpModule, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { TokenStorage } from "../app/token.storage";
import { User } from "../app/interfaces/user.interface";
import { RolesService } from "./roles.service";
import { environment } from "../environments/environment";

@Injectable()
export class UsersService {

  usersURL:string = environment.apiBase + "/users";
  headers: Headers;
  options: RequestOptions;

  constructor(private http: Http, private tokenStorage: TokenStorage, private _roleService: RolesService) {
    this.headers = new Headers({ 'Content-Type': 'application/json', 'withCredentials': 'true','Access-Control-Allow-Origin': 'true' });
    console.log(JSON.parse(localStorage.getItem('AuthToken')).token);
    this.headers.append('Authorization' , JSON.parse(localStorage.getItem('AuthToken')).token);
    this.options = new RequestOptions( { headers: this.headers } );
    console.log('Servicio listo para usar');
  }




  newUser(user: User){
    return this.http.post(this.usersURL, user, this.options)
      .map( (res: Response) => res.json() )
      .catch(this.handleErrorObservable);
  }





  updateUser(user: User){
    return this.http.put(this.usersURL, user, this.options)
      .map( res =>
        res.json()
      ).catch(this.handleErrorPromise);
  }



  deleteUser(user: User){
    return this.http.delete(this.usersURL + "/" + user.id, this.options)
      .map( res =>
        res.json()
      ).catch(this.handleErrorPromise);
  }



  getUsers() {
    return this.http.get(this.usersURL, this.options)
      .map( res =>
        res.json()
      ).catch(this.handleErrorPromise);
  }



  get(id:string) {
    return this.http.get(this.usersURL + "/" + id, this.options)
      .map( res =>
        res.json()
      ).catch(this.handleErrorPromise);
  }

  getByEmail(email:string) {
    return this.http.get(this.usersURL + "/findByEmail/" + email, this.options)
      .map( res => res.json())
      .catch(this.handleErrorPromise);
    /* return this.http.post(this.staffURL+ "/findByEmail", {"email": email}, this.options)
     .map( (res: Response) => res.json() )
     .catch(this.handleErrorObservable);*/
  }

  getInfo(user:User) {
    return this.http.get(this.usersURL + "/info/" + user.id, this.options)
      .map( res =>
        res.json()
      ).catch(this.handleErrorPromise);
  }


  initNewUser(user?:any){
    debugger;
    return user ? {
      id: user.id,
      firstName:user.firstName,
      lastName:user.lastName,
      email: user.email,
      pass: "",
      username: user.username,
      active: user.active,
      lastUpdate: user.lastUpdate,
      picture: user.picture,
      roles: user.roles,
      store: user.store
    } :
      {
        id:null,
        firstName:"",
        lastName:"",
        email: "",
        pass: "",
        username: "",
        active: false,
        lastUpdate: null,
        picture: "",
        roles: [this._roleService.initNewRol()],
        store: null
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

