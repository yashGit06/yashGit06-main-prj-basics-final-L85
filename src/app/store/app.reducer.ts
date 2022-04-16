import * as fromShoppingListReducer from '../shopping-list/store/shopping-list.reducer';
import * as fromAuthReducer from '../auth/store/auth.reducer';
import * as fromRecipesReducer from '../recipes/store/recipe.reducers'
import { ActionReducerMap } from '@ngrx/store';


export interface AppState {
    shoppingList : fromShoppingListReducer.State;
    auth : fromAuthReducer.State;
    recipes : fromRecipesReducer.State;

}

export const appReducer : ActionReducerMap<AppState> = {
    shoppingList : fromShoppingListReducer.shoppingListReducer,
    auth : fromAuthReducer.authReducer,
    recipes : fromRecipesReducer.recipeReducer
};