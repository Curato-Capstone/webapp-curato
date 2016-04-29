import { fromJS, Map, List } from 'immutable';
import type { Place, Preferences, User, Action } from '../../../types/index';

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
    id          : '1',
    preferences : Map({
        price         : 123,
        culture       : 104,
        food          : 55,
        outdoor       : 77,
        entertainment : 90,
        relaxation    : 33,
        shopping      : 20,
        sports        : 22
    })
});

type State = Map<string, any>
export default function reducer(state: State = initialState, action: Action): State {
    switch (action.type) {
        case SET_USER:
            return fromJS(action.user);

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
// export function signUpUser() {
//     return (dispatch, getState) => {
//         getState()
//     }
// }
