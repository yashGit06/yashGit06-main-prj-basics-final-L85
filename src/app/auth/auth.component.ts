import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

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
    if (!authForm.valid) { return; }
    this.isLoading = true;
    if (this.isLoginMode) {
      //..
    } else {
      this.authService.signUp(authForm.value.email, authForm.value.password).subscribe(responseData => {
        console.log(responseData);
        this.isLoading=false;
      }, errorMessage => {
        this.isLoading=false;
        this.appError = errorMessage;
      });
    }
    authForm.reset();
  }

}
