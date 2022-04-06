import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

export const ADD_INGREDIENT = '[Shopping List] Add Ingredient';
export const ADD_INGREDIENTS = '[Shopping List] Add Ingredients';
export const UPDATE_INGREDIENTS = '[Shopping List] Update Ingredients';
export const REMOVE_INGREDIENTS = '[Shopping List] Remove Ingredients';
export const START_EDIT = '[Shopping List] Start Edit';
export const STOP_EDIT = '[Shopping List] Stop Edit';

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
    constructor(public payload : Ingredient){}
}

export class RemoveIngredient implements Action{
    readonly type = REMOVE_INGREDIENTS;
}

export class StartEdit implements Action{
    readonly type = START_EDIT;
    constructor(public payload : number){}
}

export class StopEdit implements Action{
    readonly type = STOP_EDIT;
}
export type ShoppingListActionsType = AddIngredient | AddIngredients | UpdateIngredient | RemoveIngredient | StartEdit | StopEdit;