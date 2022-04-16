import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs/operators";
import { Recipe } from "../recipe.model";
import * as RecipesActionsVar from './recipe.actions'

@Injectable()
export class RecipeEffects {
    @Effect()
    fetchRecipes = this.actions$.pipe(
        ofType(RecipesActionsVar.FETCH_RECIPES),
        switchMap(() => {
            return this.http.get<Recipe[]>('https://ng-course-rc-book-default-rtdb.firebaseio.com/recipes.json');
        }), map(recipesData => {
            return recipesData.map(rsData => {// this map is to map the ingredients, if null then modify it to the empty array
                return { ...rsData, ingredients: rsData.ingredients ? rsData.ingredients : [] };
            });
        }), map(recipes=>{
            return new RecipesActionsVar.SetRecipes(recipes);
        })
    );

    constructor(private actions$: Actions, private http: HttpClient) { }
}