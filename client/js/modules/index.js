import { combineReducers } from 'redux-immutablejs';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form/immutable';

import userReducer from './user';
import suggestionsReducer from './suggestions';
import globalReducer from './global';

const rootReducer = combineReducers({
    user        : userReducer,
    suggestions : suggestionsReducer,
    global      : globalReducer,
    form        : formReducer,
    routing     : routerReducer
});

export default rootReducer;
