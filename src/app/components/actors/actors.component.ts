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

  constructor(private _actorsService: ActorsService, private _router: Router) {
    console.log('Constructor Actors');
    this._actorsService.getActors()
        .subscribe( data => {
              this.actors = data;
              this.loading = false;
        });
    this.initNewActor(this.actorSelected);

  }


  // Ya está terminada la carga
  ngOnInit() {

  }


  verActor(idx: number) {
    this._router.navigate(['/actor', idx]);
  }



  confirmDelActor(actor: Actor){
    this.actorSelected = actor;
  }


  initNewActor(actor : Actor){
    actor = {
      actorId:0,
      firstName:" ",
      lastName:" ",
      lastUpdate: new Date().getTime()
    }
  }


  delActor(actor: Actor){
    this._actorsService.deleteActor(actor).subscribe(res  =>
          {  this._router.navigate(['actors'])}
    );

  }

}
