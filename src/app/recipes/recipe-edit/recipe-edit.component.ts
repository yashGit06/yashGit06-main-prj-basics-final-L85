import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
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
      'name': new FormControl(null, Validators.required),
      'amount' : new FormControl(null,[Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
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
              'name' : new FormControl(ing.name, Validators.required),
              'amount' : new FormControl(ing.amount, [
                Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }

    this.recipeGroup = new FormGroup({
      'name':new FormControl(recipeName, Validators.required),
      'imagePath':new FormControl(recipeImagePath, Validators.required),
      'description':new FormControl(recipeDescription, Validators.required),
      'ingredients' : recipeIngArray
    });
  }

}
