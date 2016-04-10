import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux-immutablejs';
import { fromJS } from 'immutable';

import userReducer from './user';
import suggestionsReducer from './suggestions';

function formReducerImmutable(state = fromJS({}), action) {
    return fromJS(formReducer(state.toJS(), action));
}

const rootReducer = combineReducers({
    user        : userReducer,
    suggestions : suggestionsReducer,
    form        : formReducerImmutable,
    routing     : routerReducer
});

export default rootReducer;
