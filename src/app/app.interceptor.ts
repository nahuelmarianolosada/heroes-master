import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {TokenStorage} from "./token.storage";
/**
 * Created by nlosada on 02/07/18.
 */
@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor( public tokenStorage: TokenStorage) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    debugger;
    request = request.clone({
      setHeaders: {
        Authorization: JSON.parse(this.tokenStorage.getToken()).token
      }
    });
    return next.handle(request);
  }
}
