import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading =false;
  appError: string = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    let authRequest : Observable<AuthResponseData>;

    if (!authForm.valid) { return; }

    this.isLoading = true;
    if (this.isLoginMode) {
      authRequest = this.authService.login(authForm.value.email, authForm.value.password);
    } else {
      authRequest = this.authService.signUp(authForm.value.email, authForm.value.password);
    }

    authRequest.subscribe(responseData => {
      console.log(responseData);
      this.isLoading = false;
      this.appError = null;
    }, errorMessage => {
      this.isLoading = false;
      this.appError = errorMessage;
    });

    authForm.reset();
  }

}
