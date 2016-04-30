// @flow
import { Map } from 'immutable';
import type { Action } from 'types/index';

// Actions
// -----------------------------------
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
export const SET_SUCCESS_MESSAGE = 'SET_SUCCESS_MESSAGE';


// Action Creators
// -----------------------------------
export function setLoading(loading: bool): Action {
    return {
        type: SET_LOADING,
        loading
    }
}

export function setFailureMessage(failureMessage: string): Action {
    return {
        type: SET_ERROR_MESSAGE,
        failureMessage
    }
}

export function setSuccessMessage(successMessage: string): Action {
    return {
        type: SET_SUCCESS_MESSAGE,
        successMessage
    }
}


// Reducers
// -----------------------------------
const initialState = Map({
    loading: false,
    successMessage: '',
    failureMessage: ''
});

type State = Map<string, any>
export default function reducer(state: State = initialState, action: Action): State {
    switch (action.type) {
        case SET_LOADING:
            return state.set('loading', action.loading);

        case SET_ERROR_MESSAGE:
            return state.set('failureMessage', action.failureMessage);

        case SET_SUCCESS_MESSAGE:
            return state.set('successMessage', action.successMessage);

        default:
            return state;
    }
}
