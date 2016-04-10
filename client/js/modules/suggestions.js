// @flow
import { fromJS, Map, List } from 'immutable';

// Actions
// -----------------------------------
export const SET_SUGGESTIONS = 'SET_SUGGESTIONS';
export const ADD_SUGGESTION = 'ADD_SUGGESTION';
export const REMOVE_SUGGESTION = 'REMOVE_SUGGESTION';
export const CLEAR_SUGGESTIONS = 'CLEAR_SUGGESTIONS';


// Action Creators
// -----------------------------------
export function setSuggestions(suggestions: Array<Object>): Object {
    return {
        type: SET_SUGGESTIONS,
        suggestions
    };
}

export function addSuggestion(suggestion: Object): Object {
    return {
        type: ADD_SUGGESTION,
        suggestion
    };
}

export function removeSuggestion(index: number): Object {
    return {
        type: REMOVE_SUGGESTION,
        index
    };
}

export function clearSuggestions(): Object {
    return {
        type: CLEAR_SUGGESTIONS
    };
}


// Reducers
// -----------------------------------
const initialState = Map({
    suggestions : List()
});

type State = Map<string, any>;
export default function reducer(state: State = initialState, action: Object): State  {
    switch (action.type) {
        case SET_SUGGESTIONS:
            return state.set('suggestions', fromJS(action.suggestions));

        case ADD_SUGGESTION:
            return state.update('suggestions', (suggestions) => {
                return suggestions.push(fromJS(action.suggestion));
            });

        case REMOVE_SUGGESTION:
            return state.update('suggestions', (suggestions) => {
                return suggestions.delete(action.index);
            });


        case CLEAR_SUGGESTIONS:
            return initialState;

        default:
            return state;
    }
}
