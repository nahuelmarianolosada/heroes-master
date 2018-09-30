import { Component, OnInit } from '@angular/core';
import {Actor} from "../../../interfaces/actor.interface";
import {ActorsService} from "../../../../services/actors.service";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {

  heroesURL:string = "http://localhost:8080/heroes";
  nuevo:boolean = false;
  id:string;

  actor:Actor = {
                  actorId:0,
                  firstName:" ",
                  lastName:" ",
                  lastUpdate: new Date().getTime()
  }

  constructor(private _actorService:ActorsService,
              private router: Router,
              private activatedRoute:ActivatedRoute) {
    this.activatedRoute.params.subscribe(parametros => {
      console.log(parametros);
      /*debugger;*/
      this.id = parametros['id'];

      if( this.id == "nuevo" ){
       this.initNewActor();
      }else{
        this._actorService.get(this.id)
          .subscribe( data => {
            this.actor = data;
            this._actorService.getInfo(this.actor).subscribe(data => {
              debugger;
              this.actor = data;
            });

          })
      }

    });
  }




  ngOnInit() {
  }



  initNewActor(){
    this.actor = {
      actorId:0,
      firstName:" ",
      lastName:" ",
      lastUpdate: new Date().getTime()
    }
  }



  guardar(){
    this.actor.lastUpdate = new Date().getTime();

    if(this.id == "nuevo"){
      this._actorService.newActor(this.actor).subscribe((res: Response) => {
        this.router.navigate(['actors']);
      }, error => {console.log(error)});
    }else{
      this._actorService.updateActor(this.actor).subscribe((res: Response) => {
        debugger;
        this.router.navigate(['actors']);
      }, error => {debugger; console.log(error);});
    }
  }






}
