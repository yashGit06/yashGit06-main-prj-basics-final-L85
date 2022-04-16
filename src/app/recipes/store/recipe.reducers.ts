import { Recipe } from "../recipe.model";
import * as RecipesActionsVar from './recipe.actions'

export interface State{
    recipes : Recipe[]
}

const initialState : State = {
    recipes : []
}

export function recipeReducer(state = initialState, action: RecipesActionsVar.RecipesActions){
    switch(action.type){
        case RecipesActionsVar.SET_RECIPES :
            return{
                ...state,
                recipes: [...action.payload]
            };
        default :
            return state;
    }
}