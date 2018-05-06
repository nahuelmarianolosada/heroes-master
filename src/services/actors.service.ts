import { Injectable } from '@angular/core';
import {Http, RequestOptions, Response, HttpModule} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { Actor } from "../app/interfaces/actor.interface";
import {Observable} from "rxjs/Observable";
import {HttpHeaders} from "@angular/common/http";




@Injectable()
export class ActorsService {

  actorsURL:string = "http://localhost:8080/heroes/actors";
  headers: Headers;
  options: RequestOptions;

  actors: any[] = [];

  constructor(private http: Http) {
    this.headers = new Headers({ 'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9' });
    this.options = new RequestOptions( this.headers );
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
     return this.http.get(this.actorsURL)
                            .map( res =>
                              res.json()
                            ).catch(this.handleErrorPromise);
  }



  get(id:string) {
    return this.http.get(this.actorsURL + "/" + id)
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
    console.error(error.message || error);
    return Promise.reject(error.message || error);
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



