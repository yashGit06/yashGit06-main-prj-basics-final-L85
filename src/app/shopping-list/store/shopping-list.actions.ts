import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENTS = 'UPDATE_INGREDIENTS';
export const REMOVE_INGREDIENTS = 'REMOVE_INGREDIENTS';

export class AddIngredient implements Action{
    readonly type = ADD_INGREDIENT;
    constructor(public payload : Ingredient){}
}

export class AddIngredients implements Action{
    readonly type = ADD_INGREDIENTS;
    constructor(public payload : Ingredient[]){}
}

export class UpdateIngredient implements Action{
    readonly type = UPDATE_INGREDIENTS;
    constructor(public payload : {index : number, newIng : Ingredient}){}
}

export class RemoveIngredient implements Action{
    readonly type = REMOVE_INGREDIENTS;
    constructor(public payload : number){}
}

export type ShoppingListActionsType = AddIngredient | AddIngredients | UpdateIngredient | RemoveIngredient;