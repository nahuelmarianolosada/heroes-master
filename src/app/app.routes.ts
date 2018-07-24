/**
 * Created by root on 12/12/17.
 */

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { AboutComponent } from "./components/about/about.component";
import { HeroesComponent } from "./components/heroes/heroes.component";
import { HeroeComponent } from "./components/heroe/heroe.component";
import { BuscadorComponent } from "./components/buscador/buscador.component";
import {ActorsComponent} from "./components/actors/actors.component";
import {ActorComponent} from "./components/actors/actor/actor.component";
import { LoginComponent } from "./components/login/login.component";
import { UsersComponent } from "./components/users/users.component";
import {UserComponent} from "./components/users/user/user.component";

const APP_ROUTES: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'heroes', component: HeroesComponent},
  {path: 'heroe/:id', component: HeroeComponent},
  {path: 'buscar/:termino', component: BuscadorComponent},
  {path: 'actors', component: ActorsComponent},
  {path: 'actor/:id', component: ActorComponent},
  {path: 'users', component: UsersComponent},
  {path: 'user/:id', component: UserComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'login'}
];


export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
