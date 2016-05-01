import { fromJS, Map, List } from 'immutable';
import type { Place, Preferences, User, Action } from 'types/index';
import request from 'superagent-bluebird-promise';
import { routerActions } from 'react-router-redux';
import * as globalActions from './global';
import { prefsToValue, prefsToPx } from 'utils/preferences';

// Actions
// -----------------------------------
export const SET_USER = 'SET_USER';
export const SET_EMAIL = 'SET_EMAIL';
export const SET_NAME = 'SET_NAME';
export const SET_AGE = 'SET_AGE';
export const SET_GENDER = 'SET_GENDER';
export const SET_ETHNICITY = 'SET_ETHNICITY';

export const SET_FAVORITES = 'SET_FAVORITES';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

export const SET_PREFERENCES = 'SET_PREFERENCES';
export const CHANGE_PREFERENCE = 'CHANGE_PREFERENCE';


// Action Creators
// -----------------------------------
export function setUser(user: User): Action {
    return {
        type: SET_USER,
        user
    };
}

export function setEmail(email: string): Action {
    return {
        type: SET_EMAIL,
        email
    };
}

export function setName(name: string): Action {
    return {
        type: SET_NAME,
        name
    };
}

export function setAge(age: number): Action {
    return {
        type: SET_AGE,
        age
    };
}

export function setGender(gender: string): Action {
    return {
        type: SET_GENDER,
        gender
    };
}

export function setEthnicity(ethnicity: string): Action {
    return {
        type: SET_ETHNICITY,
        ethnicity
    };
}

export function setFavorites(favorites: Array<Place>): Action {
    return {
        type: SET_FAVORITES,
        favorites
    };
}

export function setPreferences(preferences: Preferences): Action {
    return {
        type: SET_PREFERENCES,
        preferences
    };
}

export function addFavorite(favorite: Place): Action {
    return {
        type: ADD_FAVORITE,
        favorite
    };
}

export function removeFavorite(index: number): Action {
    return {
        type: REMOVE_FAVORITE,
        index
    };
}

export function changePreference(preferenceName: string, value: number): Action {
    return {
        type: CHANGE_PREFERENCE,
        preferenceName,
        value
    };
}


// Reducers
// -----------------------------------
const initialState = Map({
    email       : 'mister-pie@hotmail.com',
    name        : 'Mister Pie',
    age         : 25,
    gender      : 'male',
    ethnicity   : 'white',
    favorites   : List(),
    id          : '123456789',
    preferences : Map({
        price         : 100,
        culture       : 100,
        food          : 100,
        outdoor       : 100,
        entertainment : 100,
        relaxation    : 100,
        shopping      : 100,
        sports        : 100
    })
});

type State = Map<string, any>
export default function reducer(state: State = initialState, action: Action): State {
    switch (action.type) {
        case SET_USER:
            const user = Object.assign(
                {},
                action.user,
                { preferences: prefsToPx(action.user.preferences) }
            );
            return fromJS(user);

        case SET_EMAIL:
            return state.set('email', action.email);

        case SET_NAME:
            return state.set('name', action.name);

        case SET_AGE:
            return state.set('age', action.age);

        case SET_GENDER:
            return state.set('gender', action.gender);

        case SET_ETHNICITY:
            return state.set('ethnicity', action.ethnicity);

        case SET_FAVORITES:
        case ADD_FAVORITE:
        case REMOVE_FAVORITE:
            return state.set('favorites', favoritesReducer(state.get('favorites'), action));

        case SET_PREFERENCES:
        case CHANGE_PREFERENCE:
            return state.set('preferences', preferencesReducer(state.get('preferences'), action));

        default:
            return state;
    }
}

function favoritesReducer(state: List<Place>, action: Action): List<Place>  {
    switch (action.type) {
        case SET_FAVORITES:
            return fromJS(action.favorites);

        case ADD_FAVORITE:
            return state.push(fromJS(action.favorite));

        case REMOVE_FAVORITE:
            return state.delete(action.index);

        default:
            return state;
    }
}

function preferencesReducer(state: Map<string, number>, action: Action): Map<string, number>  {
    switch (action.type) {
        case SET_PREFERENCES:
            return Map(action.preferences);

        case CHANGE_PREFERENCE:
            return state.set(action.preferenceName, action.value);

        default:
            return state;
    }
}

// Thunks
// -----------------------------------
import { SubmissionError } from 'redux-form';

const serverBaseURL = 'http://ec2-54-186-80-121.us-west-2.compute.amazonaws.com:8000';

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

            const res = await request
                .post(`${serverBaseURL}/user/signup`)
                .send(user);

            dispatch(setUser(res.body));
            // set auth here too
            dispatch(routerActions.push('/'));
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

export function updateAccount() {
    return async (dispatch, getState) => {
        try {
            dispatch(globalActions.setLoading(true));
            const accountValues = getState().getIn(['form', 'AccountForm', 'values']).toJS();

            // const res = await request
            //     .put(`${serverBaseURL}/user`)
            //     .send(accountValues);

            // dispatch(setUser(res.body));
            dispatch(globalActions.setSuccessMessage('Successfully Updated Account!'));
            setTimeout(() => dispatch(globalActions.setSuccessMessage(''), 2000));
        } catch (error) {
            dispatch(globalActions.setFailureMessage('Update failed'));
            setTimeout(() => dispatch(globalActions.setFailureMessage(''), 2000));
        }

        dispatch(globalActions.setLoading(false));
    };
}

export function updatePreferences() {
    return async (dispatch, getState) => {
        try {
            dispatch(globalActions.setLoading(true));
            const preferences = getState().getIn(['user', 'preferences']).toJS();

            // const res = await request
            //     .put(`${serverBaseURL}/user/`)
            //     .send({ preferences: prefsToValue(preferences) });

            dispatch(globalActions.setSuccessMessage('Successfully Updated Preferences!'));
            setTimeout(() => dispatch(globalActions.setSuccessMessage(''), 2000));
        } catch (error) {
            dispatch(globalActions.setFailureMessage('Update failed'));
            setTimeout(() => dispatch(globalActions.setFailureMessage(''), 2000));
        }

        dispatch(globalActions.setLoading(false));
    };
}

export function addFavoriteThunk(place) {
    return async (dispatch, getState) => {
        try {
            dispatch(globalActions.setLoading(true));

            // await request
            //     .post(`${serverBaseURL}/place/favorites/add`)
            //     .send({ id: place.id });

            dispatch(addFavorite(place));
        } catch (error) {
            dispatch(globalActions.setFailureMessage('Update failed'));
            setTimeout(() => dispatch(globalActions.setFailureMessage(''), 2000));
        }

        dispatch(globalActions.setLoading(false));
    };
}

export function removeFavoriteThunk(place, index) {
    return async (dispatch, getState) => {
        try {
            dispatch(globalActions.setLoading(true));

            // await request
            //     .post(`${serverBaseURL}/place/favorites/remove`)
            //     .send({  id: place.id });

            dispatch(removeFavorite(index));
        } catch (error) {
            dispatch(globalActions.setFailureMessage('Update failed'));
            setTimeout(() => dispatch(globalActions.setFailureMessage(''), 2000));
        }

        dispatch(globalActions.setLoading(false));
    };
}

export function dislikePlace(id) {
    return async (dispatch, getState) => {
        try {
            await request
                .post(`${serverBaseURL}/place/dislike`)
                .send({  id });
        } catch (error) {
            dispatch(globalActions.setFailureMessage('Update failed'));
            setTimeout(() => dispatch(globalActions.setFailureMessage(''), 2000));
        }
    };
}
