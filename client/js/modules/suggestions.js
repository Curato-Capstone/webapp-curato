import { fromJS, Map, List } from 'immutable';
import type { Place, Action } from '../../../types/index';
import request from 'superagent-bluebird-promise';
import { routerActions } from 'react-router-redux';


// Actions
// -----------------------------------
export const SET_SUGGESTIONS = 'SET_SUGGESTIONS';
export const ADD_SUGGESTION = 'ADD_SUGGESTION';
export const REMOVE_SUGGESTION = 'REMOVE_SUGGESTION';
export const CLEAR_SUGGESTIONS = 'CLEAR_SUGGESTIONS';
export const CHANGE_SEARCH_TEXT = 'CHANGE_SEARCH_TEXT';


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

export function changeSearchText(text: string): Action {
    return {
        type: CHANGE_SEARCH_TEXT,
        text
    };
}


const place1 = {
    name: 'EMP',
    location: {address: '1234 Street Ave., Seattle, WA'},
    image: require('images/places/emp.jpg'),
    id: '123'
};

const place2 = {
    name: 'Space Needle',
    location: {address: '1234 Street Ave., Seattle, WA'},
    image: require('images/places/space_needle.jpg'),
    id: '124',
};

const place3 = {
    name: 'Pike Place Market',
    location: {address: '1234 Street Ave., Seattle, WA'},
    image: require('images/places/pike_place_market.jpg'),
    id: '125'
};

// Reducers
// -----------------------------------
const initialState = Map({
    suggestions : List([place1, place2, place3]),
    searchText: ''
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

        case CHANGE_SEARCH_TEXT:
            return initialState.set('searchText', action.text);

        default:
            return state;
    }
}


// Thunks
// -----------------------------------
export function getSuggestions() {
    return (dispatch, getState) => {
        const query = getState().getIn(['suggestion', 'searchText']);

        // request.get('ec2-54-186-80-121.us-west-2.compute.amazonaws.com:8000/user/1/favorites')
        //     .then((res) => {
        //         dispatch(setSuggestions(res.body));
        //         dispatch(routerActions.push('/suggestions'));
        //     })
        //     .catch((e) => {
        //         console.warn(e)
        //     })

        dispatch(routerActions.push('/suggestions'));
    };s
}
