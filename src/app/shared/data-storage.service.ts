import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/internal/operators/map";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService : RecipeService) { }

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-course-rc-book-default-rtdb.firebaseio.com/recipes.json',recipes)
        .subscribe(data=>{
            console.log("PUT response : ",data);
        });
    }

    fetchRecipes() {
        this.http.get<Recipe[]>('https://ng-course-rc-book-default-rtdb.firebaseio.com/recipes.json')
            .pipe(map(recipesData => {
                return recipesData.map(rsData => {
                    return { ...rsData, ingredients: rsData.ingredients ? rsData.ingredients : [] };
                });
            }))
            .subscribe(data => {
                console.log("GET response", data);
                this.recipeService.setRecipes(data);
            });
    }
}