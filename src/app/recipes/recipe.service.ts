import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  // recipeSelected = new EventEmitter<Recipe>();
  // recipeSelected = new Subject<Recipe>();
  recipeChanged = new Subject<Recipe[]>();

  constructor() { }
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     0,
  //     'Tasty Schnitzel',
  //     'A super-tasty Schnitzel - just awesome!',
  //     'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
  //     [
  //       new Ingredient('Potato', 1),
  //       new Ingredient('French Fries', 20)
  //     ]),
  //   new Recipe(1,'Big Fat Burger',
  //     'What else you need to say?',
  //     'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
  //     [
  //       new Ingredient('Chicken', 2),
  //       new Ingredient('Onions', 1)
  //     ])
  // ];

  private recipes: Recipe[] = [];

  setRecipes(recipes : Recipe[]){
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(index:number){
    return this.recipes[index];
  }

  addRecipe(newRec : Recipe){
    this.recipes.push(newRec);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(idIndex : number,newRec : Recipe){
    this.recipes[idIndex]= newRec;
    this.recipeChanged.next(this.recipes.slice());
  }

  searchAndRemove(index:number){
    this.recipes.splice(index,1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
