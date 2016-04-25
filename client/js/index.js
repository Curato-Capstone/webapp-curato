import React from 'react';
import ReactDOM from 'react-dom';
import composeStore from './CreateStore';

import Root from 'containers/Root';
import '../stylesheets/main.css';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
const store = composeStore();

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
