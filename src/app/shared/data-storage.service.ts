import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { map, tap } from "rxjs/operators";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import * as fromApp from '../store/app.reducer'
import * as RecipesActionsVar from '../recipes/store/recipe.actions'

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService, private store: Store<fromApp.AppState>) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-course-rc-book-default-rtdb.firebaseio.com/recipes.json', recipes)
            .subscribe(data => {
                console.log("PUT response : ", data);
            });
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>('https://ng-course-rc-book-default-rtdb.firebaseio.com/recipes.json').pipe(map(recipesData => {
            return recipesData.map(rsData => {// this map is to map the ingredients, if null then modify it to the empty array
                return { ...rsData, ingredients: rsData.ingredients ? rsData.ingredients : [] };
            });
        }), tap(data => {
            console.log("GET response", data);
            this.store.dispatch(new RecipesActionsVar.SetRecipes(data));
            // this.recipeService.setRecipes(data);
        }));
    }
}