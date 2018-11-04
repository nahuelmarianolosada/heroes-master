import { Injectable } from '@angular/core';
import { environment } from "../environments/environment.qa";
import { Http, RequestOptions, Response, HttpModule, Headers} from '@angular/http';
import { TokenStorage } from "../app/token.storage";
import { Observable } from "rxjs/Observable";

@Injectable()
export class StoreService {

  storeURL:string = environment.apiBase + "/store";
  headers: Headers;
  options: RequestOptions;

  stores: any[] = [];

  constructor(private http: Http, private tokenStorage: TokenStorage) {
    this.headers = new Headers({ 'Content-Type': 'application/json', 'withCredentials': 'true','Access-Control-Allow-Origin': 'true' });
    console.log(JSON.parse(localStorage.getItem('AuthToken')).token);
    this.headers.append('Authorization' , JSON.parse(localStorage.getItem('AuthToken')).token);
    this.options = new RequestOptions( { headers: this.headers } );
    console.log('Servicio listo para usar');
  }


  getStores() {
    return this.http.get(this.storeURL, this.options)
      .map( res =>
        res.json()
      ).catch(this.handleErrorPromise);
  }



  get(id:string) {
    return this.http.get(this.storeURL + "/" + id, this.options)
      .map( res =>
        res.json()
      ).catch(this.handleErrorPromise);
  }


  initNewStore(store?:any){
    debugger;
    return store ? {
      storeId: store.storeId,
      managerStaff: store.managerStaff,
      address: store.address,
      lastUpdate: store.lastUpdate
    } :
      {
        storeId:null,
        managerStaff:null,
        address:{address: null},
        lastUpdate:null
      }
  }


  private handleErrorObservable (error: Response | any) {
    debugger;
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }


  private handleErrorPromise (error: Response | any) {
    debugger;
    console.error(error.statusText || error);
    return Promise.reject(error.status || error);
  }

}
