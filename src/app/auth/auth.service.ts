import { Injectable } from '@angular/core';

import * as AuthActionsVar from '../auth/store/auth.actions'
import * as fromAppReducer from '../store/app.reducer'
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authExpirationTimer: any;

  constructor(private store: Store<fromAppReducer.AppState>) { }

  setLogoutTimer(expirationDate: number) {
    this.authExpirationTimer = setTimeout(() => {
      this.store.dispatch(new AuthActionsVar.Logout());
    }, expirationDate);
  }

  clearLogoutTImer() {
    if (this.authExpirationTimer) {
      clearTimeout(this.authExpirationTimer);
      this.authExpirationTimer = null;
    }
  }

}
