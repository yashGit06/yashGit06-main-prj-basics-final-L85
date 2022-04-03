import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

const initialState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ]
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
        default : return state;
    }
}