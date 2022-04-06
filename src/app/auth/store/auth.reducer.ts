import { User } from "../user.model";
import * as AuthActionsVar from './auth.actions'

export interface State {
    user : User;
}

const initialState : State = {
    user : null
}

export function authReducer(state = initialState, action:AuthActionsVar.AuthActions){
    switch(action.type){
        case AuthActionsVar.LOGIN:
            const newUser = new User(action.payload.email,action.payload.id,action.payload.token,action.payload.expireIn);
            return {
                ...state,
                user: newUser
            };
        case AuthActionsVar.LOGOUT:
            return{
                ...state,
                user:null
            }
        default:
            return state;
    }
}