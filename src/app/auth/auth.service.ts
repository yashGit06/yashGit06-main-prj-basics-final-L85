import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string
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
      }).pipe(catchError(errorData => {
        // console.log(errorData);
        let appError = "An unknown error occurred!"

        if(!errorData.error || !errorData.error.error){
          return throwError(appError);
        }

        switch(errorData.error.error.message){
          case "EMAIL_EXISTS" : appError = "Provide email already exist!"; break;
        }
        return throwError(appError);
      }));
  }
}
