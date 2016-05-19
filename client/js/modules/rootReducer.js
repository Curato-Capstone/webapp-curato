import { combineReducers } from 'redux-immutablejs';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form/immutable';

import {
    userReducer,
    suggestionsReducer,
    globalReducer,
    authReducer,
    placesReducer
} from './index';

const rootReducer = combineReducers({
    user        : userReducer,
    suggestions : suggestionsReducer,
    places      : placesReducer,
    global      : globalReducer,
    auth        : authReducer,
    form        : formReducer,
    routing     : routerReducer
});

export default rootReducer;
