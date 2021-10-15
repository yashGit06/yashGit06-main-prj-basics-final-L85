import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  // @Input() recipeDataToDisplay:Recipe; //= new Recipe('A Test Rsdsdfdsecipe1', 'This i454334est1', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg');
  recipeDataToDisplay:Recipe;
  id : number;
  constructor(private shoppingListService:ShoppingListService, private route : ActivatedRoute, private recipeService : RecipeService ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params : Params) => {
        this.id = +params['id'];
        console.log(this.recipeService.getRecipes()[this.id]);
        this.recipeDataToDisplay=this.recipeService.getRecipes()[this.id];
      }
    );
  }

  addToShoppingList(){
    // for(let ing of this.recipeDataToDisplay.ings){
    //   this.shoppingListService.updateIngredients(ing);
    // }
    this.shoppingListService.updateBulkIngredients(this.recipeDataToDisplay.ings);
  }

}
