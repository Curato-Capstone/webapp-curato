// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';

import Sample from '../components/Sample';

type Props = {};
class App extends Component {
    static defaultProps: void;
    state: void;
    props: Props;

    render(): React.Element {
        const {} = this.props;

        return (
            <div>
                <Sample name="yoooo" />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {
        //actions : bindActionCreators({dispatchAction}, dispatch),
        //routerActions : bindActionCreators(routerActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
