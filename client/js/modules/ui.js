import { fromJS, Map, List } from 'immutable';

// Actions
// -----------------------------------
export const SET_NAVIGATION_VISIBILITY = 'SET_NAVIGATION_VISIBILITY';


// Action Creators
// -----------------------------------
export function setNavigationVisibility(show) {
    return {
        type: SET_NAVIGATION_VISIBILITY,
        show
    }
}


// Reducers
// -----------------------------------
const initialState = Map({
    navigationVisibility: false
});

type State = Map<string, any>
export default function reducer(state: State = initialState, action: Action): State {
    switch (action.type) {
        case SET_NAVIGATION_VISIBILITY:
            return initialState.set();

        default:
            return state;
    }
}
