import { Recipe } from "../recipe.model";
import * as RecipesActionsVar from './recipe.actions'

export interface State {
    recipes: Recipe[]
}

const initialState: State = {
    recipes: []
}

export function recipeReducer(state = initialState, action: RecipesActionsVar.RecipesActions) {
    switch (action.type) {
        case RecipesActionsVar.SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
            };
        case RecipesActionsVar.ADD_RECIPES:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };
        case RecipesActionsVar.UPDATE_RECIPES:
            const updatedRecipe = {...state.recipes[action.payload.idIndex], ...action.payload.newRec};
            console.log("updatedRecipe: "+JSON.stringify(updatedRecipe));
            const updatedRecipes = [...state.recipes];
            console.log("updatedRecipes1: "+JSON.stringify(updatedRecipes));
            updatedRecipes[action.payload.idIndex] = updatedRecipe;
            console.log("updatedRecipes2: "+JSON.stringify(updatedRecipes));
            return {
                ...state,
                recipes: updatedRecipes
            };
        case RecipesActionsVar.DELETE_RECIPES:
            return {
                ...state,
                recipes: state.recipes.filter((rc, i) => i !== action.payload) //[...state.recipes.slice(0,action.payload),state.recipes.slice(action.payload, state.recipes.length)]
            };
        default:
            return state;
    }
}