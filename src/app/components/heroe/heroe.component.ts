import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroesService} from '../../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent {

  heroe:any = {};

  constructor(private activatedRoute: ActivatedRoute, private _heroeService: HeroesService) {
    this.activatedRoute.params.subscribe(
      params =>{
        console.log(params['id']);//Id que recibe como parametro GET
        this.heroe = this._heroeService.getHeroe(params['id']);
        //this.heroe = HeroesService.getHeroe(params['id']);
      }
    );
  }


}
