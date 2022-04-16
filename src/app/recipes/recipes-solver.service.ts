import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";
import * as fromApp from "../store/app.reducer";
import { Store } from "@ngrx/store";
import * as RecipesActionsVar from "./store/recipe.actions";
import { Actions, ofType } from "@ngrx/effects";
import { take } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class RecipesSolverService implements Resolve<Recipe[]>{
    constructor(private dataStorageService : DataStorageService, private recipesService : RecipeService, private store : Store<fromApp.AppState>, private actions$ : Actions){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        // const recipes = this.recipesService.getRecipes();
        // if(recipes.length === 0){
        //     return this.dataStorageService.fetchRecipes();
        // } else{
        //     return recipes;
        // }
        this.store.dispatch(new RecipesActionsVar.FetchRecipes());
        return this.actions$.pipe(ofType(RecipesActionsVar.SET_RECIPES), take(1));
    }
}