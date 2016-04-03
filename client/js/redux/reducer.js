import { ADD_TODO } from './constants';
import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux-immutablejs';

import Immutable from 'immutable';

// Beginning state of app
const initialState = Immutable.Map({
    todos : Immutable.List(),
    test  : 'hiiii'
});

function app(state = initialState, action) {
    switch (action.type) {
        case ADD_TODO:
            return {};

        default:
            return state;
    }
}

const rootReducer = combineReducers({
    app,
    routing: routerReducer
});

export default rootReducer;
