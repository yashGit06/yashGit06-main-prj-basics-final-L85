import { Action } from "@ngrx/store";
import { Recipe } from "../recipe.model";

export const SET_RECIPES = '[Recipes] Set Recipes';
export const FETCH_RECIPES = '[Recipes] Fetch Recipes';
export const ADD_RECIPES = '[Recipes] Add Recipe';
export const UPDATE_RECIPES = '[Recipes] Update Recipe';
export const DELETE_RECIPES = '[Recipes] Delete Recipe';
export const STORE_RECIPES = '[Recipes] Store Recipe';


export class SetRecipes implements Action{
    readonly type = SET_RECIPES;
    constructor(public payload : Recipe[]){}
}

export class FetchRecipes implements Action{
    readonly type = FETCH_RECIPES;
}

export class AddRecipe implements Action{
    readonly type = ADD_RECIPES;
    constructor(public payload :Recipe){}
}

export class UpdateRecipe implements Action{
    readonly type = UPDATE_RECIPES;
    constructor(public payload : {idIndex : number,newRec : Recipe}){}
}

export class DeleteRecipe implements Action{
    readonly type = DELETE_RECIPES;
    constructor(public payload :number){}
}

export class StoreRecipe implements Action{
    readonly type = STORE_RECIPES;
    // constructor(public payload : Recipe[]){}
}

export type RecipesActions = SetRecipes | FetchRecipes | AddRecipe | UpdateRecipe | DeleteRecipe |StoreRecipe;