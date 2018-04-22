import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// SERVICIOS
import { HeroesService } from '../services/heroes.service';
import { ActorsService } from "../services/actors.service";

// ROUTES
import {APP_ROUTING} from './app.routes';


// COMPONENTS
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroeComponent } from './components/heroe/heroe.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { ActorsComponent } from './components/actors/actors.component';
import { ActorComponent } from './components/actors/actor/actor.component'



//  PIPES ng g p pipes/keys
import { KeysPipe } from './pipes/keys.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    HeroesComponent,
    HeroeComponent,
    BuscadorComponent,
    ActorsComponent,
    ActorComponent,
    KeysPipe
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    APP_ROUTING,
    HttpModule,
    FormsModule
  ],
  providers: [
    HeroesService,
    ActorsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
