/**
 * Created by nlosada on 02/07/18.
 */


import { Injectable } from '@angular/core';


const TOKEN_KEY = 'AuthToken';

@Injectable()
export class TokenStorage {

  constructor() { }

  signOut() {
    /*localStorage.removeItem("currentUser");*/
   /* window.sessionStorage.removeItem("currentUser");*/
    localStorage.removeItem(TOKEN_KEY);
    localStorage.clear();
  }

  public saveToken(token: string) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY,  token);
  }

  public getToken(): any {
    localStorage.getItem(TOKEN_KEY);
  }
}
