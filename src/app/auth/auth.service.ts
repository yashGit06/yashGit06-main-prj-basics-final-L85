import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
  constructor(private http: HttpClient) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBvH17t1_SD81MZmHDv7Bn5ZQ2faIoI-68',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.httpError));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBvH17t1_SD81MZmHDv7Bn5ZQ2faIoI-68', {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.httpError));
  }

  httpError(errorData: HttpErrorResponse) {
    console.log("Error : ",errorData);
    let appError = "An unknown error occurred!"

    if (!errorData.error || !errorData.error.error) {
      return throwError(appError);
    }

    switch (errorData.error.error.message) {
      case "EMAIL_EXISTS": appError = "Provide email already exist!"; break;
      case "EMAIL_NOT_FOUND": appError = "Login attempt failed! Provide email not found."; break;
      case "INVALID_PASSWORD": appError = "Login attempt failed! Provide password is wrong."; break;
      case "USER_DISABLED": appError = "Login attempt failed! Provide email is disabled."; break;
    }
    return throwError(appError);
  }
}
