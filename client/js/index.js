import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import injectTapEventPlugin from 'react-tap-event-plugin';

import composeStore from './CreateStore';

import Root from 'containers/Root';
import '../stylesheets/main.css';

injectTapEventPlugin();
const store = composeStore();

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
