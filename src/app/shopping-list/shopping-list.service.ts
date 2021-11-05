import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  // IngredientChanged = new EventEmitter<Ingredient[]>();
  IngredientChanged = new Subject<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  constructor() { }
  updateIngredients(newIng: Ingredient) {
    // let newIng = new Ingredient(data.nameValue,data.amtValue);
    this.ingredients.push(newIng);
    // console.log(this.ingredients);
    this.IngredientChanged.next(this.ingredients.slice());
  }

  getIngredients(){
    return this.ingredients.slice();
  }

  updateBulkIngredients(newIngArray : Ingredient[]){
    this.ingredients.push(...newIngArray);
    this.IngredientChanged.next(this.ingredients.slice());
  }
}
