import { Component, OnInit } from '@angular/core';
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




  constructor(private _actorsService: ActorsService, private _router: Router) {
    console.log('Constructor Actors');
    this._actorsService.getActors()
        .subscribe( data => {
              /*for (let d$ in data){
                console.log(data[d$]);
                this.actors.push(data[d$])
              }*/
              this.actors = data;
        })
  }


  // Ya está terminada la carga
  ngOnInit() {

  }


  verActor(idx: number) {
    this._router.navigate(['/actor', idx]);
  }

}
