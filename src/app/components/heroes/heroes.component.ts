import {Component, OnInit} from '@angular/core';
import {HeroesService} from '../../../services/heroes.service';
import {Router} from '@angular/router';
import {Heroe} from "../../interfaces/heroe.interface";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Heroe[] = [];

  constructor(private _heroesService: HeroesService, private _router: Router) {
    console.log('Constructor');
  }


  // Ya está terminada la carga
  ngOnInit() {
    this.heroes = this._heroesService.getHeroes();
    console.log(this.heroes);
  }


  verHeroe(idx: number) {
    this._router.navigate(['/heroe', idx]);
  }

}
