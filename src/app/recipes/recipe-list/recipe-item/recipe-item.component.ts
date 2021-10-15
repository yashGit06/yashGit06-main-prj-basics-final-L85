import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  id: number;
  // @Output() emittedRecipeDetails = new EventEmitter<Recipe>();
  // @Output() emittedRecipeDetails = new EventEmitter<void>();


  constructor(private recipeServ : RecipeService, private router:Router, private route : ActivatedRoute) { }

  ngOnInit() {
  }

  emitDishDetails(recipeDetails:Recipe){
    // this.emittedRecipeDetails.emit(recipeDetails);
    // this.emittedRecipeDetails.emit();
    // this.recipeServ.recipeSelected.emit(this.recipe);
    this.id = this.recipeServ.getRecipeByName(recipeDetails.name).id;
    console.log("ID : ",this.id);
    this.router.navigate([this.id],{relativeTo:this.route});
  }

}
