import { User } from "../user.model";
import * as AuthActionsVar from './auth.actions'

export interface State {
    user : User;
    authError : string;
    loadingState : boolean;
}

const initialState : State = {
    user : null,
    authError: null,
    loadingState : false
}

export function authReducer(state = initialState, action:AuthActionsVar.AuthActions){
    switch(action.type){
        case AuthActionsVar.AUTHENTICATE_SUCCESS:
            const newUser = new User(action.payload.email,action.payload.id,action.payload.token,action.payload.expireIn);
            return {
                ...state,
                user: newUser,
                authError: null,
                loadingState : false
            };
        case AuthActionsVar.LOGOUT:
            return{
                ...state,
                user:null
            }
        case AuthActionsVar.LOGIN_START:
        case AuthActionsVar.SIGNUP_START:
            return{
                ...state,
                authError: null,
                loadingState : true
            }
        case AuthActionsVar.AUTHENTICATE_FAIL:
            return{
                ...state,
                authError: action.payload,
                loadingState : false
            }
        case AuthActionsVar.CLEAR_ERROR :
            return{
                ...state,
                authError : null
            }
        default:
            return state;
    }
}