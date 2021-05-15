import {
    SIGN_IN_USER,
    SIGN_UP_USER,
    AUTH_USER
} from '../_actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case SIGN_IN_USER:
            return {...state, signInSuccess : action.payload}
            break;

        case SIGN_UP_USER:
            return {...state, signUpSuccess : action.payload}
            break;

        case AUTH_USER:
            return {...state, userData : action.payload}
            break;
    
        default:
            return state;
    }       
}