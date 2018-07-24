import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

// SERVICIOS
import { HeroesService } from '../services/heroes.service';
import { ActorsService } from "../services/actors.service";
import { UsersService } from "../services/users.service";
import {AuthService} from "../services/auth.service";
import { Interceptor } from "./app.interceptor";

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
import { ActorComponent } from './components/actors/actor/actor.component';
import { LoginComponent } from './components/login/login.component';
import { TokenStorage } from './token.storage'
import { UsersComponent } from './components/users/users.component';
import { UserComponent } from './components/users/user/user.component';

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
    KeysPipe,
    LoginComponent,
    UsersComponent,
    UserComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    APP_ROUTING,
    HttpModule,
    FormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ],
  providers: [
    HeroesService,
    ActorsService,
    AuthService,
    TokenStorage,
    UsersService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

/*platformBrowserDynamic().bootstrapModule(AppModule);*/
