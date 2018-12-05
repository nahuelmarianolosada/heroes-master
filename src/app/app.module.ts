import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';

// SERVICIOS
import { HeroesService } from '../services/heroes.service';
import { ActorsService } from "../services/actors.service";
import { UsersService } from "../services/users.service";
import { AuthService } from "../services/auth.service";
import { RolesService } from "../services/roles.service";
import { StaffService } from "../services/staff.service";
import { StoreService } from "../services/store.service";


// ROUTES
import { APP_ROUTING } from './app.routes';


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
import { RolesComponent } from "./components/roles/roles.component";
import { CmbRolComponent } from "./components/roles/rol/cmb-rol/cmb-rol.component";
import { StaffComponent } from './components/staff/staff.component';
import { MyProfileComponent } from './components/users/my-profile/my-profile.component';
import { CmbStoreComponent } from './components/store/cmb-store/cmb-store.component';

//  PIPES ng g p pipes/keys
import { KeysPipe } from './pipes/keys.pipe';
import { environment } from "../environments/environment";
import { UserStaffComponent } from './components/staff/user-staff/user-staff.component';
import { ShowErrorsComponent } from './components/shared/form/show-errors/show-errors.component';


// DIRECTIVES
import { TelephoneNumberFormatValidatorDirective } from './directives/telephone-number-format-validator.directive';
import { EmailFormatValidatorDirective } from './directives/email-format-validator.directive';





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
    UserComponent,
    RolesComponent,
    CmbRolComponent,
    StaffComponent,
    MyProfileComponent,
    UserStaffComponent,
    ShowErrorsComponent,
    TelephoneNumberFormatValidatorDirective,
    EmailFormatValidatorDirective,
    CmbStoreComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    APP_ROUTING,
    HttpModule,
    FormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  providers: [
    HeroesService,
    ActorsService,
    AuthService,
    TokenStorage,
    UsersService,
    RolesService,
    StaffService,
    StoreService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

  constructor() {
    console.log('Base Api :' + environment.apiBase +
      ' production? ' +  environment.production +
      ' env: ' + environment.envName);
  }
}

/*platformBrowserDynamic().bootstrapModule(AppModule);*/
