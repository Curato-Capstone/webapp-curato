import request from 'superagent-bluebird-promise';
import { routerActions } from 'react-router-redux';
import * as globalActions from './global';
import * as userActions from './user';

// Actions
// -----------------------------------
export const SET_IS_AUTHENTICATING = 'SET_USER';
export const SET_AUTHENTICATED = 'SET_EMAIL';


// Action Creators
// -----------------------------------
export function setIsAuthenticating(authenticating) {
    return {
        type: SET_IS_AUTHENTICATING,
        authenticating
    };
}

export function setAuthenticated(authenticated) {
    return {
        type: SET_AUTHENTICATED,
        authenticated
    }
}


// Reducers
// -----------------------------------
const initialState = Map({
    isAuthenticating: false,
    authenticated: false
});

type State = Map<string, any>
export default function reducer(state: State = initialState, action: Action): State {
    switch (action.type) {


        default:
            return state;
    }
}

export function signUpUser() {
    return async (dispatch, getState) => {
        try {
            const preferences = getState().getIn(['user', 'preferences']).toJS();
            const formValues = getState().getIn(['form', 'SignUpForm', 'values']).toJS();
            const favorites = getState().getIn(['user', 'favorites']).toJS();

            const user = Object.assign(
                {},
                formValues,
                { favorites },
                { preferences: prefsToValue(preferences) }
            );

            console.log(user);

            const res = await request
                .post(`${serverBaseURL}/user/signup`)
                .send(user);

            console.log(res);

            // dispatch(setUser(res.body));
            // set auth here too
            // dispatch(routerActions.push('/'));
        } catch (error) {
            dispatch(globalActions.setFailureMessage('Sign Up Failed bruh'));
            setTimeout(() => dispatch(globalActions.setFailureMessage(''), 2000));
            return SubmissionError({ _error: 'You dun goofed' });
        }
    }
}

export function signInUser() {
    return async (dispatch, getState) => {
        try {
            const loginCredentials = getState().getIn(['form', 'SignInForm', 'values']).toJS();

            const res = await request
                .post(`${serverBaseURL}/user/signin`)
                .send(loginCredentials);

            dispatch(setUser(res.body));
            // set auth here too
            dispatch(routerActions.push('/'))
        } catch (error) {
            dispatch(globalActions.setFailureMessage('Sign In Failed bruh'));
            setTimeout(() => dispatch(globalActions.setFailureMessage(''), 2000));
            return SubmissionError({ _error: 'You dun goofed' });
        }
    }
}

export function checkAuth() {
    return async (dispatch, getState) => {
        try {
            const user = getState().get('user');

            console.log(user);

            await setTimeout(() => console.log('done checking'), 2000)
            // if (user.get('id')) {
            //     //only check if they are authenticated
            // } else {
            //     //getUserData();
            // }
        } catch (error) {
            // send dat noob to the intro
            dispatch(routerActions.push('/intro'));
        }
    };
}
