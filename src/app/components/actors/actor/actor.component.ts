import { Component, OnInit } from '@angular/core';
import {Actor} from "../../../interfaces/actor.interface";
import {ActorsService} from "../../../../services/actors.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {

  actorURL:string = "http://localhost:8080/heroes/actor";

  actor:Actor = {
                  actorId:0,
                  firstName:" ",
                  lastName:" ",
                  lastUpdate:1419038000
  }

  constructor(private _actorService:ActorsService, private router: Router) { }

  ngOnInit() {
  }


  guardar(){
    this.actor.lastUpdate = 1419038000;
    this._actorService.newActor(this.actor).subscribe((res: Response) => {
      debugger;
      this.router.navigate(['/actor', res]);
    }, error => {console.log(error)});

  }

}
