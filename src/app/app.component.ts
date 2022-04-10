import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAppReducer from './store/app.reducer'
import * as AuthActions from './auth/store/auth.actions'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  // recipesView : boolean = true;
  // shoppingView : boolean = false;
  constructor( private store : Store<fromAppReducer.AppState>){}
  ngOnInit(): void {
      // this.authService.autoLogin();
      this.store.dispatch(new AuthActions.AutoLogin());
  }
}
