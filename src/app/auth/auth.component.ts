import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';
import * as fromApp from '../store/app.reducer'
import * as AuthActions from '../auth/store/auth.actions'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading =false;
  appError: string = null;
  @ViewChild(PlaceholderDirective,{static:false}) alertHost : PlaceholderDirective;
  subscription : Subscription;

  constructor(private authService: AuthService, private router : Router, private cfr : ComponentFactoryResolver, private store : Store<fromApp.AppState>) { }

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
      // authRequest = this.authService.login(authForm.value.email, authForm.value.password);
      this.store.dispatch(new AuthActions.LoginStart({email:authForm.value.email,password:authForm.value.password}));
    } else {
      authRequest = this.authService.signUp(authForm.value.email, authForm.value.password);
    }

    authRequest.subscribe(responseData => {
      console.log(responseData);
      this.isLoading = false;
      this.appError = null;
      this.router.navigate(['/recipes']);
    }, errorMessage => {
      this.isLoading = false;
      this.appError = errorMessage;
      this.showErrorAlert(errorMessage);
    });

    authForm.reset();
  }

  onCloseErrorModal(){
    this.appError=null;
  }

  private showErrorAlert(message:string){//this method will create the alert modal dynamically
    const componentFactory = this.cfr.resolveComponentFactory(AlertComponent); //loading the Angular alert component to CRF
    const alertHostRef = this.alertHost.viewContainerRef; // Getting ViewContainerRef, which helps to create new view, whenever called(here its "placeHolder")
    alertHostRef.clear(); //clearing the view
    const componentRef = alertHostRef.createComponent(componentFactory);// loading the view with AlertComponent via crf.
    componentRef.instance.message=message; //it will load the error message in the component's message 
    this.subscription = componentRef.instance.closeModal.subscribe(data=>{ // in order to listen to close event, we subscribe to Output Event
      this.subscription.unsubscribe();
      alertHostRef.clear();//clearing the view
    });
  }

  ngOnDestroy(): void {
      if(this.subscription){
        this.subscription.unsubscribe();
      }
  }

}
