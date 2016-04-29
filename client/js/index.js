import React from 'react';
import ReactDOM from 'react-dom';
import composeStore from './CreateStore';

import Root from 'containers/Root';
import '../stylesheets/main.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'babel-polyfill'
import request from 'superagent-bluebird-promise';

request.get('http://ec2-54-186-80-121.us-west-2.compute.amazonaws.com:8000/user/1/favorites').then((res) => console.log(res));

injectTapEventPlugin();
const store = composeStore();



ReactDOM.render(<Root store={store} />, document.getElementById('root'));
