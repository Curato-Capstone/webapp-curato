import 'velocity-animate';
import 'velocity-animate/velocity.ui';
import { velocityHelpers } from 'velocity-react';

const FadeAnimation = {
    // Register these with UI Pack so that we can use stagger later.
    In: velocityHelpers.registerEffect({
        calls: [
            [{
                opacity: 1
            }, 1, {
                easing: 'ease-out'
            }]
        ]
    }),

    Out: velocityHelpers.registerEffect({
        calls: [
            [{
                opacity: 0
            }, 1, {
                easing: 'ease-out'
            }]
        ]
    })
};

export const enterFadeAnimation = {
    animation: FadeAnimation.In,
    stagger: 150,
    duration: 750,
    backwards: true,
    display: 'block',
    style: {
        // Since we're staggering, we want to keep the display at "none" until Velocity runs
        // the display attribute at the start of the animation.
        display: 'none'
    }
};

export const leaveFadeAnimation = {
    animation: FadeAnimation.Out,
    stagger: 100,
    duration: 500,
    backwards: true
};

const FlipAnimations = {
    // Register these with UI Pack so that we can use stagger later.
    In: velocityHelpers.registerEffect({
        calls: [
            [{
                transformPerspective: [800, 800],
                transformOriginX: ['50%', '50%'],
                transformOriginY: ['100%', '100%'],
                marginBottom: 24,
                opacity: 1,
                rotateX: [0, 130]
            }, 1, {
                easing: 'ease-out',
                display: 'block'
            }]
        ]
    }),

    Out: velocityHelpers.registerEffect({
        calls: [
            [{
                transformPerspective: [800, 800],
                transformOriginX: ['50%', '50%'],
                transformOriginY: ['0%', '0%'],
                marginBottom: -30,
                opacity: 0,
                rotateX: -70
            }, 1, {
                easing: 'ease-out',
                display: 'block'
            }]
        ]
    })
};

export const enterFlipAnimation = {
    animation: FlipAnimations.In,
    stagger: 150,
    duration: 500,
    backwards: true,
    display: 'flex',
    style: {
        // Since we're staggering, we want to keep the display at "none" until Velocity runs
        // the display attribute at the start of the animation.
        display: 'none'
    }
};

export const leaveFlipAnimation = {
    animation: FlipAnimations.Out,
    stagger: 100,
    duration: 500,
    backwards: true
};
