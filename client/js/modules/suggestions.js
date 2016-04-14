import { fromJS, Map, List } from 'immutable';
import type { Place, Action } from '../../../types/index';

// Actions
// -----------------------------------
export const SET_SUGGESTIONS = 'SET_SUGGESTIONS';
export const ADD_SUGGESTION = 'ADD_SUGGESTION';
export const REMOVE_SUGGESTION = 'REMOVE_SUGGESTION';
export const CLEAR_SUGGESTIONS = 'CLEAR_SUGGESTIONS';


// Action Creators
// -----------------------------------
export function setSuggestions(suggestions: Array<Place>): Action {
    return {
        type: SET_SUGGESTIONS,
        suggestions
    };
}

export function addSuggestion(suggestion: Place): Action {
    return {
        type: ADD_SUGGESTION,
        suggestion
    };
}

export function removeSuggestion(index: number): Action {
    return {
        type: REMOVE_SUGGESTION,
        index
    };
}

export function clearSuggestions(): Action {
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
export default function reducer(state: State = initialState, action: Action): State  {
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
