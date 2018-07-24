import {Component, OnInit} from '@angular/core';
import { ActorsService } from "../../../services/actors.service";

import { Router } from "@angular/router";


import { Actor } from "../../interfaces/actor.interface";




@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css']
})
export class ActorsComponent implements OnInit {

  /*actorURL:string = "http://localhost:8080/heroes/actors";*/

  actors: any[] = [];
  actorSelected: Actor;
  p: number = 1; //paginator
  loading: boolean = true;
  filter: any = '';
  error: string;

  constructor(private _actorsService: ActorsService, private _router: Router) {
    console.log('Constructor Actors');
    this.getAll();
    this.actorSelected = this.initNewActor();

  }


  // Ya está terminada la carga
  ngOnInit() {
    this.actorSelected = this.initNewActor();
  }



  verActor(idx: number) {
    this._router.navigate(['/actor', idx]);
  }



  confirmDelActor(actor: Actor){
    this.actorSelected = actor;
  }


  initNewActor(){
    return {
      actorId:0,
      firstName:"",
      lastName:"",
      lastUpdate: new Date().getTime()
    }
  }


  getAll(){
    this._actorsService.getActors()
      .subscribe( data => {
        this.actors = data;
        this.loading = false;
      }, error => {
        this.loading = false;
        this.error = error;
      });
  }



  delActor(actor: Actor){
    this._actorsService.deleteActor(actor).subscribe(res  =>
          {  this.getAll(); this._router.navigate(['actors'])}
    );
  }


  viewInfo(actor: Actor){
    this._actorsService.getInfo(actor).subscribe(res  =>
      {
          this.actorSelected = {
                    actorId:res.actorId,
                    firstName:res.firstName,
                    lastName:res.lastName,
                    lastUpdate: res.lastUpdate,
                    filmInfo: res.filmInfo
          };
      }
    );
  }

}
