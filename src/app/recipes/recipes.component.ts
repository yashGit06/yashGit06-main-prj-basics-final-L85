import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers : [RecipeService]
})
export class RecipesComponent implements OnInit {
  recipeItem:Recipe;
  constructor(private recipeServ : RecipeService) { }

  ngOnInit() {
    this.recipeServ.recipeSelected.subscribe(
      (recipe : Recipe) => {
        this.recipeItem = recipe;
      }
    );
  }

  // emitToRecipeDetail(data:Recipe){
  //   this.recipeItem = data;
  // } 

}
