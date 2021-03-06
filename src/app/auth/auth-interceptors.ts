import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { take, exhaustMap, map } from "rxjs/operators";
import { AuthService } from "./auth.service";
import * as fromAppReducer from '../store/app.reducer'
import { Store } from "@ngrx/store";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    constructor(private authService: AuthService, private store : Store<fromAppReducer.AppState>){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select('auth').pipe(take(1),map(authData=>authData.user), exhaustMap(exData => {//take(1) for getting subscribed once and then unsubscribed automatically. | exhaustMap is used to map to the inner value, it means you can return to the inner observable value(If it is in nested form)
            if(!exData){
                return next.handle(req);
            }

            const modifiedReq = req.clone({
                params : new HttpParams().set('auth', exData.token) //it will add the auth token to the get request
            });
            return next.handle(modifiedReq);
        }));
    }
}