import { Component, Input, OnInit } from '@angular/core';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipeDataToDisplay:Recipe; //= new Recipe('A Test Rsdsdfdsecipe1', 'This i454334est1', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg');
  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit() {
  }

  addToShoppingList(){
    // for(let ing of this.recipeDataToDisplay.ings){
    //   this.shoppingListService.updateIngredients(ing);
    // }
    this.shoppingListService.updateBulkIngredients(this.recipeDataToDisplay.ings);
  }

}
