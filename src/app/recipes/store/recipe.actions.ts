import { Action } from "@ngrx/store";
import { Recipe } from "../recipe.model";

export const SET_RECIPES = '[Recipes] Set Recipes';
// export const GET_RECIPE = '[Recipes] Set Recipe';

export class SetRecipes implements Action{
    readonly type = SET_RECIPES;
    constructor(public payload : Recipe[]){}
}

export type RecipesActions = SetRecipes;