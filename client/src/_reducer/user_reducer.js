import {
    SIGN_IN_USER,
    SIGN_UP_USER,
    AUTH_USER,
    LOGOUT_USER
} from '../_actions/types';

export default (state={}, action) => {
    switch (action.type) {
        case SIGN_IN_USER:
            return {...state, login : action.payload}
        case SIGN_UP_USER:
            return {...state, register : action.payload}
        case AUTH_USER:
            return {...state, userData : action.payload}
        case LOGOUT_USER:
            return {...state }
        default:
            return state;
    }       
}