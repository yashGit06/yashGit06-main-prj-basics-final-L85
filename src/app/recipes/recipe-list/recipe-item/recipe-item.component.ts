import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  // @Output() emittedRecipeDetails = new EventEmitter<Recipe>();
  // @Output() emittedRecipeDetails = new EventEmitter<void>();


  constructor(private recipeServ : RecipeService) { }

  ngOnInit() {
  }

  emitDishDetails(recipeDetails:Recipe){
    // this.emittedRecipeDetails.emit(recipeDetails);
    // this.emittedRecipeDetails.emit();
    this.recipeServ.recipeSelected.emit(this.recipe);
  }

}
