import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromAppReducer from '../../store/app.reducer';
import { map,switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  // @Input() recipeDataToDisplay:Recipe; //= new Recipe('A Test Rsdsdfdsecipe1', 'This i454334est1', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg');
  recipeDataToDisplay:Recipe;
  id : number;
  constructor(private route : ActivatedRoute, private recipeService : RecipeService, private router : Router,
    private store: Store<fromAppReducer.AppState>) { }

  ngOnInit() {
    this.route.params
    .pipe(map(params=>{
      return +params['id'];
    }), switchMap(id=>{
      this.id =id;
      return this.store.select('recipes');
    }),map(recipesState=>{
      return recipesState.recipes.find((rcp, i)=>{
        return i === this.id;
      })
    })).subscribe(fetchedRecipes=>this.recipeDataToDisplay=fetchedRecipes);
  }

  addToShoppingList(){
    // for(let ing of this.recipeDataToDisplay.ingredients){
    //   this.shoppingListService.updateIngredients(ing);
    // }
    // this.shoppingListService.updateBulkIngredients(this.recipeDataToDisplay.ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipeDataToDisplay.ingredients));
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo:this.route});
  }

  onDeleteRecipe(){
      this.recipeService.searchAndRemove(this.id);
      this.router.navigate(['/recipes'], {relativeTo:this.route});
  }

}
