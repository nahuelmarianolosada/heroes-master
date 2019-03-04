
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Http, Headers, Response } from "@angular/http";
import { TokenStorage } from "../app/token.storage";
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "../environments/environment";
@Injectable()
export class AuthService {

  /*private authUrl = 'http://localhost:8080/heroes/login';*/
  private authUrl = environment.authUrl;
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http, private tokenStorage:TokenStorage) {
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post(this.authUrl, JSON.stringify({email: email, pass: password}), {headers: this.headers})
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        /*let token = response.json() && response.json().token;*/
        let token = response.headers.get("Authorization");
        if (token) {
          let body = response.text();
          var user = JSON.parse(body);
          // store username and jwt token in local storage to keep user logged in between page refreshes
          /*localStorage.setItem('currentUser', JSON.stringify({ email: email }));*/
          this.tokenStorage.saveToken(JSON.stringify({ email: user.email, role: user.authorities, token: token }));
          // return true to indicate successful login
          console.log(this.tokenStorage.getToken());
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      }).catch((error:any) => Observable.throw(error || 'Server error'));
  }

  /*getToken(): String {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var token = currentUser && currentUser.token;
    return token ? token : "";
  }*/

  /*public isAuthenticated(): boolean {
    const token = this.tokenStorage.getToken();
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }*/


  getLogedUser(): any{
    /*return JSON.parse(localStorage.getItem('currentUser'));*/
    return this.tokenStorage.getToken();
  }


  logout(): void {
    // clear token remove user from local storage to log user out
    /*localStorage.removeItem('currentUser');*/
    this.tokenStorage.signOut();
  }
}
