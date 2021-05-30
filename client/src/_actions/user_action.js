import Axios from 'axios';
import {
    SIGN_IN_USER,
    SIGN_UP_USER,
    AUTH_USER,
    LOGOUT_USER,
} from './types'

export const SignInUser = async(dataToSubmit) => {
    const signInResult = await Axios.post('/api/user/signIn', dataToSubmit);
    const signInData = signInResult.data;

    return {
        type: SIGN_IN_USER,
        payload: signInData
    }
}

export const SignUpUser =  async(dataToSubmit) => {
    const signUpResult = await Axios.post('/api/user/signUp', dataToSubmit);
    const signUpData = signUpResult.data;

    return {
        type: SIGN_UP_USER,
        payload: signUpData
    }
}

export const auth = async() => {
    const authResult = await Axios.get('/api/user/auth');
    const authData = authResult.data;

    return {
        type: AUTH_USER,
        payload: authData
    }
}


export const logoutUser = async() => {
    const logoutResult = await Axios.get(`/api/user/logout`);
    const logoutData = logoutResult.data;

    return {
        type: LOGOUT_USER,
        payload: logoutData
    }
}