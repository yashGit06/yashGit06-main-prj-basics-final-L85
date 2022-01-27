import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

export interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?:boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  authExpirationTimer:any;

  constructor(private http: HttpClient, private router : Router) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBvH17t1_SD81MZmHDv7Bn5ZQ2faIoI-68',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.httpError), tap(resData=>{
        this.httpAuthHandle(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBvH17t1_SD81MZmHDv7Bn5ZQ2faIoI-68', {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.httpError), tap(resData=>{
      this.httpAuthHandle(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    }));
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.authExpirationTimer){
      clearTimeout(this.authExpirationTimer);
    }
    this.authExpirationTimer=null;
  }

  autoLogin(){
    const localData: {email: string, id: string, _token: string, _tokenExpirationDate:string} = JSON.parse(localStorage.getItem('userData'));
    if(!localData){
      return;
    }
    const loadUser = new User(localData.email, localData.id, localData._token, new Date(localData._tokenExpirationDate));
    if(loadUser.token){
      this.user.next(loadUser);
      const expirationDateInNumber = new Date(localData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDateInNumber);
    }
  }

  autoLogout(expirationDate:number){
    // console.log("Ex Date : ",expirationDate);
    this.authExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDate);
  }

  httpAuthHandle(email : string, id : string, token:string, expireIn : number){
    const expireInDate = new Date(new Date().getTime() + expireIn*1000)
    const newUser = new User(email, id, token, expireInDate);
    this.user.next(newUser);
    this.autoLogout(expireIn*1000);
    localStorage.setItem('userData',JSON.stringify(newUser));
  }

  httpError(errorData: HttpErrorResponse) {
    console.log("Error : ",errorData);
    let appError = "An unknown error occurred!"

    if (!errorData.error || !errorData.error.error) {
      return throwError(appError);
    }

    switch (errorData.error.error.message) {
      case "EMAIL_EXISTS": appError = "Provide email already exist!"; break;
      case "EMAIL_NOT_FOUND": appError = "Login attempt failed! Provided email not found."; break;
      case "INVALID_PASSWORD": appError = "Login attempt failed! Provided password is wrong."; break;
      case "USER_DISABLED": appError = "Login attempt failed! Provided email is disabled."; break;
    }
    return throwError(appError);
  }
}
