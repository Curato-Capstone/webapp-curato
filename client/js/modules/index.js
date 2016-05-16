import { combineReducers } from 'redux-immutablejs';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form/immutable';

import {
    userReducer,
    suggestionsReducer,
    globalReducer,
    authReducer
} from 'redux-curato';

const rootReducer = combineReducers({
    user        : userReducer,
    suggestions : suggestionsReducer,
    global      : globalReducer,
    auth        : authReducer,
    form        : formReducer,
    routing     : routerReducer
});

export default rootReducer;
