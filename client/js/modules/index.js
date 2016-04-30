import { combineReducers } from 'redux-immutablejs';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form/immutable';

import userReducer from './user';
import suggestionsReducer from './suggestions';

const rootReducer = combineReducers({
    user        : userReducer,
    suggestions : suggestionsReducer,
    form: formReducer,
    routing     : routerReducer
});

export default rootReducer;
