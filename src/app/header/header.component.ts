import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() rsEmit = new EventEmitter<{ r: boolean, s: boolean }>();
  // @Output() sEmit = new EventEmitter<boolean>();
  isAuthenticated = false;
  fetchedCount=0;
  private subscription : Subscription;
  value: {
    r: boolean;
    s: boolean;
  } = { r: null, s: null };

  constructor(private httpService : DataStorageService, private authService : AuthService){}

  ngOnInit() {
      this.subscription = this.authService.user.subscribe(userData =>{
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

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}