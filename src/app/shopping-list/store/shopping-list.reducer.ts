import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

export interface State {
    ingredients : Ingredient[],
    editedIngredient : Ingredient,
    editedIngredientIndex : number
}

export interface AppState {
    shoppingList : State;
}

const initialState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ],
    editedIngredient : null,
    editedIngredientIndex : -1
};

export function shoppingListReducer(state = initialState, action : ShoppingListActions.ShoppingListActionsType) {
    switch(action.type){
        case ShoppingListActions.ADD_INGREDIENT : 
        return{
            ...state,
            ingredients : [...state.ingredients,action.payload]     //state.ingredients will have old data, where as in action.payload will have the new data.
        };
        case ShoppingListActions.ADD_INGREDIENTS : 
        return{
            ...state,
            ingredients : [...state.ingredients, ...action.payload]
        };

        case ShoppingListActions.UPDATE_INGREDIENTS:
            const searchedIngredient = state.ingredients[state.editedIngredientIndex];
            const updatedIngredient = {
                ...searchedIngredient,
                ...action.payload
            };
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIngredientIndex]= updatedIngredient;
            return{
                ...state,
                ingredients : updatedIngredients,
                editedIngredient : null,
                editedIngredientIndex : -1
            };

        case ShoppingListActions.REMOVE_INGREDIENTS:
            const afterRemoveIngredients = state.ingredients.filter((ig,igInx)=> igInx!=state.editedIngredientIndex);
            return{
                ...state,
                ingredients : afterRemoveIngredients,
                editedIngredient : null,
                editedIngredientIndex : -1
            };

        case ShoppingListActions.START_EDIT:
            return{
                ...state,
                editedIngredientIndex : action.payload,
                editedIngredient : state.ingredients[action.payload]
            };

        case ShoppingListActions.STOP_EDIT:
            return{
                ...state,
                editedIngredientIndex : -1,
                editedIngredient : null
            };
        default : return state;
    }
}