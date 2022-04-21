import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAppReducer from './store/app.reducer'
import * as AuthActions from './auth/store/auth.actions'
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  // recipesView : boolean = true;
  // shoppingView : boolean = false;
  constructor( private store : Store<fromAppReducer.AppState>, @Inject(PLATFORM_ID) private platformID){}
  ngOnInit(): void {
      // this.authService.autoLogin();
      if(isPlatformBrowser(this.platformID))
        this.store.dispatch(new AuthActions.AutoLogin());
  }
}
