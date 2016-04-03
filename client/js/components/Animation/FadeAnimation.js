import React, { PropTypes } from 'react';
import Radium from 'radium';

import { VelocityTransitionGroup } from 'velocity-react';
import { enterFadeAnimation, leaveFadeAnimation } from '../../animations';

function FadeAnimation(props) {
    return (
        <VelocityTransitionGroup
            component="div"
            style={{ display: 'block' }}
            enter={enterFadeAnimation}
            leave={leaveFadeAnimation}
        >
            {props.children}
        </VelocityTransitionGroup>
    );
}

FadeAnimation.propTypes = {
    children: PropTypes.element.isRequired
};
FadeAnimation.defaultProps = {};

export default Radium(FadeAnimation);
