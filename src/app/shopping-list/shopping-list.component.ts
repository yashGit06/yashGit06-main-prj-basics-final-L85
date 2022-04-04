import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import * as fromAppReducer from '../store/app.reducer';
import * as ShoppingListActions from './store/shopping-list.actions'


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients:Ingredient[]}>;
  private shoppingListSubs : Subscription;

  constructor(private store: Store<fromAppReducer.AppState>) { 
  }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList'); //fetch the data
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.shoppingListSubs = this.shoppingListService.IngredientChanged.subscribe(
    //   (ingredients:Ingredient[])=>{
    //     this.ingredients = ingredients;
    //   }
    // );
  }

  onEditItem(index: number){
    // this.shoppingListService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  ngOnDestroy(){
    // this.shoppingListSubs.unsubscribe();
  }
}
