import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService : RecipeService, private authService : AuthService) { }

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-course-rc-book-default-rtdb.firebaseio.com/recipes.json',recipes)
        .subscribe(data=>{
            console.log("PUT response : ",data);
        });
    }

    fetchRecipes() {
        return this.authService.user.pipe(take(1), exhaustMap(exData => {
            return this.http.get<Recipe[]>('https://ng-course-rc-book-default-rtdb.firebaseio.com/recipes.json',{
                params : new HttpParams().set('auth', exData.token)
            });
        }), map(recipesData => {
            return recipesData.map(rsData => {
                return { ...rsData, ingredients: rsData.ingredients ? rsData.ingredients : [] };
            });
        }), tap(data => {
            console.log("GET response", data);
            this.recipeService.setRecipes(data);
        }));
    }
}