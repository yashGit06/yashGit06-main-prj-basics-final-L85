import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';
import * as fromAppReducer from '../store/app.reducer'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() rsEmit = new EventEmitter<{ r: boolean, s: boolean }>();
  // @Output() sEmit = new EventEmitter<boolean>();
  isAuthenticated = false;
  fetchedCount=0;
  navbarCollapsed =true;
  private subscription : Subscription;
  value: {
    r: boolean;
    s: boolean;
  } = { r: null, s: null };

  constructor(private httpService : DataStorageService, private authService : AuthService, private store: Store<fromAppReducer.AppState>){}

  ngOnInit() {
      this.subscription = this.store.select('auth').pipe(map(authData=>authData.user)).subscribe(userData =>{
        this.isAuthenticated = !!userData;
      });
  }

  checkVisible(type: string) {
    if (type === 'recipes') {
      this.value.r = true;
      this.value.s = false;
    } else {
      this.value.r = false;
      this.value.s = true;
    }
    this.rsEmit.emit(this.value);
  }

  onSaveData(){
    this.httpService.storeRecipes();
  }

  onFetchData(){
    this.httpService.fetchRecipes().subscribe();
    this.fetchedCount++;
  }

  onLogout(){
    this.authService.logout();
    this.isAuthenticated = false;
  }

  toggleNavbarCollapsing(){
    this.navbarCollapsed = !this.navbarCollapsed;
  }

  firstFetch(){
    return this.fetchedCount>0?true:false
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}