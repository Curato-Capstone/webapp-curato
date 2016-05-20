import React from 'react';
import { createDevTools } from 'redux-devtools';
import { fromJS } from 'immutable';

import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

let selectDevToolsState = (state = {}) => fromJS(state).toJS();

const DevTools = createDevTools(
    <DockMonitor toggleVisibilityKey="ctrl-h"
                 changePositionKey="ctrl-q"
    >
        <LogMonitor theme="tomorrow" select={selectDevToolsState} />
    </DockMonitor>
);

export default DevTools;
