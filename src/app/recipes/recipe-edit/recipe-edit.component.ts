import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeGroup : FormGroup;

  constructor(private route:ActivatedRoute, private recipeService : RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) =>{
        this.id = +params['id'];
        // this.editMode = params['id'] ? true : false; //myLogic
        this.editMode = params['id'] != null;
        // console.log(this.editMode);
        this.initForm();
      }
    );
  }

  addIngredients(){
    const dataGroup = new FormGroup({
      'name': new FormControl(),
      'amount' : new FormControl()
    });
    (<FormArray> this.recipeGroup.get('ingredients')).push(dataGroup);
  }

  onSubmit(){
    console.log(this.recipeGroup);
  }

  get controls(){
    return (<FormArray>this.recipeGroup.get('ingredients')).controls;
  }

  private initForm(){
    let recipeName="";
    let recipeImagePath ='';
    let recipeDescription ='';
    let recipeIngArray = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe['ings']){
        for(let ing of recipe.ings){
          recipeIngArray.push(
            new FormGroup({
              'name' : new FormControl(ing.name),
              'amount' : new FormControl(ing.amount)
            })
          );
        }
      }
    }

    this.recipeGroup = new FormGroup({
      'name':new FormControl(recipeName),
      'imagePath':new FormControl(recipeImagePath),
      'description':new FormControl(recipeDescription),
      'ingredients' : recipeIngArray
    });
  }

}
