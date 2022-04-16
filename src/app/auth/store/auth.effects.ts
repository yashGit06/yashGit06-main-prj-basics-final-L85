import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AuthService } from "../auth.service";
import { User } from "../user.model";
import * as AuthActions from './auth.actions';

export interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

const handleAuthentication = (resData: AuthResponseData) => {
    const expireInDate = new Date(new Date().getTime() + +resData.expiresIn * 1000)
    const newUser = new User(resData.email, resData.localId, resData.idToken, expireInDate);
    localStorage.setItem('userData', JSON.stringify(newUser));
    return new AuthActions.AuthenticateSuccess({ email: resData.email, id: resData.localId, token: resData.idToken, expireIn: expireInDate ,redirect: true});
};

const handleAuthenticationError = (errorData: any) => {
    console.log("Error NgRx : ", errorData);
    let appError = "An unknown error occurred!"

    if (!errorData.error || !errorData.error.error) {
        return of(new AuthActions.AuthenticateFail(appError));
    }

    switch (errorData.error.error.message) {
        case "EMAIL_EXISTS": appError = "Provide email already exist!"; break;
        case "EMAIL_NOT_FOUND": appError = "Login attempt failed! Provided email not found."; break;
        case "INVALID_PASSWORD": appError = "Login attempt failed! Provided password is wrong."; break;
        case "USER_DISABLED": appError = "Login attempt failed! Provided email is disabled."; break;
    }
    return of(new AuthActions.AuthenticateFail(appError));
};

@Injectable()
export class AuthEffects {
    @Effect()
    authSignup = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((authData: AuthActions.SignupStart) => {
            return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.FirebaseAPIKey, {
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true
            }).pipe(
                tap(resData =>{
                    this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                }),
                map(resData => {
                return handleAuthentication(resData);
            }), catchError(errorData => {
                return handleAuthenticationError(errorData);
            }));
        })
    );

    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.FirebaseAPIKey, {
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true
            }).pipe(
                tap(resData =>{
                    this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                }),
                map(resData => {
                return handleAuthentication(resData);
            }), catchError(errorData => {
                return handleAuthenticationError(errorData);
            }));
        })
    );
    @Effect({ dispatch: false })
    authRedirect = this.actions$.pipe(ofType(AuthActions.AUTHENTICATE_SUCCESS, AuthActions.LOGOUT), tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
        if (authSuccessAction.payload.redirect) {
            this.router.navigate(['/']);
        }
    }));

    @Effect({ dispatch: false })
    authLogout = this.actions$.pipe(ofType(AuthActions.LOGOUT), tap(() => {
        this.authService.clearLogoutTImer();
        localStorage.removeItem('userData');
        this.router.navigate(['/auth']);
    }));

    @Effect()
    autoLogin = this.actions$.pipe(ofType(AuthActions.AUTO_LOGIN), map(() => {
        const localData: { email: string, id: string, _token: string, _tokenExpirationDate: string } = JSON.parse(localStorage.getItem('userData'));
        if (!localData) {
            return {type:'Dummy'};
        }
        const loadUser = new User(localData.email, localData.id, localData._token, new Date(localData._tokenExpirationDate));
        if (loadUser.token) {
            const expirationDateInNumber = new Date(localData._tokenExpirationDate).getTime() - new Date().getTime();
            this.authService.setLogoutTimer(expirationDateInNumber);
            return new AuthActions.AuthenticateSuccess({ email: loadUser.email, id: loadUser.id, token: loadUser.token, expireIn: new Date(localData._tokenExpirationDate), redirect:false });
        }
        return {type:'Dummy'};
    }));
    constructor(private actions$: Actions, private http: HttpClient, private router: Router, private authService : AuthService) { }
}