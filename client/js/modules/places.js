// @flow
import { Map, fromJS } from 'immutable';
import type { Action } from 'flow/types';

// Actions
// -----------------------------------
export const SET_PLACES = 'SET_PLACES';
export const ADD_PLACES = 'ADD_PLACES';

// Action Creators
// -----------------------------------
export function setPlaces(places: Array<Object>): Action {
    return {
        type: SET_PLACES,
        places
    };
}

export function addPlaces(places: Array<Object>): Action {
    return {
        type: ADD_PLACES,
        places
    };
}


// Reducers
// -----------------------------------
const initialState = Map();

type State = Map<string, Object>
export default function reducer(state: State = initialState, action: Action): State {
    const places = {};

    switch (action.type) {
        case SET_PLACES:
            for (const place of action.places) {
                places[place.id] = fromJS(place);
            }

            return fromJS(places);

        case ADD_PLACES:
            for (const place of action.places) {
                places[place.id] = fromJS(place);
            }

            return state.merge(places);

        default:
            return state;
    }
}
