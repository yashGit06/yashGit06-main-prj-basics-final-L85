import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromApp from '../../store/app.reducer'
import * as RecipesActionsVar from '../store/recipe.actions'

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  recipeGroup : FormGroup;
  private storeSubs : Subscription;

  constructor(private http : HttpClient ,private route:ActivatedRoute, private router : Router, private store : Store<fromApp.AppState>) { }

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
    // const addNewRecipe = new Recipe(
    //   this.id,
    //   this.recipeGroup.value['name'],
    //   this.recipeGroup.value['description'],
    //   this.recipeGroup.value['imagePath'],
    //   this.recipeGroup.value['ingredients']);
    if(this.editMode){
      // this.recipeService.updateRecipe(this.id,this.recipeGroup.value);
      this.store.dispatch(new RecipesActionsVar.UpdateRecipe({idIndex:this.id,newRec:this.recipeGroup.value}))
    } else{
      // this.recipeService.addRecipe(this.recipeGroup.value);
      this.store.dispatch(new RecipesActionsVar.AddRecipe(this.recipeGroup.value))
    }
    // this.httpService.storeRecipes();
    this.store.dispatch(new RecipesActionsVar.StoreRecipe());
    this.router.navigate(['../'], {relativeTo:this.route});
  }

  get controls(){
    return (<FormArray>this.recipeGroup.get('ingredients')).controls;
  }

  onCancel(){
    this.recipeGroup.reset();
    this.router.navigate(['../'], {relativeTo:this.route});
  }

  onDeleteIngredients(indexIng: number){
    (<FormArray>this.recipeGroup.get('ingredients')).removeAt(indexIng);
  }

  private initForm(){
    let recipeName="";
    let recipeImagePath ='';
    let recipeDescription ='';
    let recipeIngArray = new FormArray([]);

    if (this.editMode) {
      // const recipe = this.recipeService.getRecipe(this.id);
      this.storeSubs = this.store.select('recipes').pipe(map(recipeState => recipeState.recipes.find((rc, i) => {
        return i === this.id;
      }))).subscribe(recipe => {
        recipeName = recipe.name;
        recipeImagePath = recipe.imagePath;
        recipeDescription = recipe.description;
        if (recipe['ingredients']) {
          for (let ing of recipe.ingredients) {
            recipeIngArray.push(
              new FormGroup({
                'name': new FormControl(ing.name, Validators.required),
                'amount': new FormControl(ing.amount, [
                  Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
              })
            );
          }
        }
      });
    }

    this.recipeGroup = new FormGroup({
      'name':new FormControl(recipeName, Validators.required),
      'imagePath':new FormControl(recipeImagePath, Validators.required),
      'description':new FormControl(recipeDescription, Validators.required),
      'ingredients' : recipeIngArray
    });
  }

  ngOnDestroy(): void {
    if(this.storeSubs){
      this.storeSubs.unsubscribe();
    }
  }

}
