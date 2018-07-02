/**
 * Created by nlosada on 02/07/18.
 */
import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
  HttpResponse, HttpUserEvent, HttpErrorResponse, HttpEvent, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import {TokenStorage} from './token.storage';
import 'rxjs/add/operator/do';


const TOKEN_HEADER_KEY = 'Authorization';

/*@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(private tokenStorage: TokenStorage, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
          let authReq = req;
          debugger;
          if (this.tokenStorage.getToken() != null) {
          authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + this.tokenStorage.getToken())});
        }

        return next.handle(authReq).do(
          (err: any) => {
            if (err instanceof HttpErrorResponse) {

              if (err.status === 403) {
                this.router.navigate(['/login']);
              }
            }
          }
        );
    }
}*/


@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private tokenStorage: TokenStorage ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return Observable.fromPromise(this.handleAccess(request, next));
  }

  private async handleAccess(request: HttpRequest<any>, next: HttpHandler):
  Promise<HttpEvent<any>> {
    const token = await this.tokenStorage.getToken();
    debugger;
    let changedRequest = request;
    // HttpHeader object immutable - copy values
    const headerSettings: {[name: string]: string | string[]; } = {};

    for (const key of request.headers.keys()) {
      headerSettings[key] = request.headers.getAll(key);
    }
    if (token) {
      headerSettings['Authorization'] = token.token;
    }
    headerSettings['Content-Type'] = 'application/json';
    const newHeader = new HttpHeaders(headerSettings);

    changedRequest = request.clone({
      headers: newHeader});
    return next.handle(changedRequest).toPromise();
  }

}
