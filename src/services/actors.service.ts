import { Injectable } from '@angular/core';
import {Http, RequestOptions, Response, HttpModule, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { Actor } from "../app/interfaces/actor.interface";
import {Observable} from "rxjs/Observable";
import {TokenStorage} from "../app/token.storage";




@Injectable()
export class ActorsService {

  actorsURL:string = "http://localhost:8080/heroes/actors";
  headers: Headers;
  options: RequestOptions;

  actors: any[] = [];

  constructor(private http: Http, private tokenStorage: TokenStorage) {
    /*'Bearer ' + this.tokenStorage.getToken()*/
debugger;
    this.headers = new Headers({ 'Content-Type': 'application/json', 'withCredentials': 'true' });
    console.log(JSON.parse(localStorage.getItem('AuthToken')).token);
    this.headers.append('Authorization' , JSON.parse(localStorage.getItem('AuthToken')).token);
    /*let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', JSON.parse(this.tokenStorage.getToken()).token);

    let options = new RequestOptions({ headers: Headers });*/



    debugger;
    this.options = new RequestOptions( { headers: this.headers } );
    console.log('Servicio listo para usar');
  }




  newActor(actor: Actor){
   return this.http.post(this.actorsURL, actor, this.options)
              .map( (res: Response) => res.json() )
              .catch(this.handleErrorObservable);
  }





   updateActor(actor: Actor){
     return this.http.put(this.actorsURL, actor, this.options)
       .map( res =>
         res.json()
       ).catch(this.handleErrorPromise);
  }



  deleteActor(actor: Actor){

    return this.http.delete(this.actorsURL + "/" + actor.actorId, this.options)
      .map( res =>
        res.json()
      ).catch(this.handleErrorPromise);
  }



  getActors() {
     return this.http.get(this.actorsURL, this.options)
                            .map( res =>
                              res.json()
                            ).catch(this.handleErrorPromise);
  }



  get(id:string) {
    return this.http.get(this.actorsURL + "/" + id, this.options)
      .map( res =>
        res.json()
      ).catch(this.handleErrorPromise);
  }



  getInfo(actor:Actor) {
    return this.http.get(this.actorsURL + "/info/" + actor.actorId, this.options)
      .map( res =>
        res.json()
      ).catch(this.handleErrorPromise);
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



  /*getActor(idx: string): Actor {
    return this.actors[idx];
  }*/


  /*findActor(termino: string): Actor[] {
    let heroesArr: Actor[] = [];
    termino = termino.toLowerCase();

    for (let actor of this.actors) {
      let nombre = actor.first_name.toLowerCase();
      if (nombre.indexOf(termino) >= 0) {
        heroesArr.push(actor);
      }
    }
    return heroesArr;
  }*/


}



