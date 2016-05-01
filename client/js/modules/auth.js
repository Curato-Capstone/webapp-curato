import request from 'superagent-bluebird-promise';
import { routerActions } from 'react-router-redux';
import * as globalActions from './global';
import * as userActions from './user';

export function checkAuth() {
    return async (dispatch, getState) => {
        try {
            const user = getState().get('user');

            console.log(user);

            await setTimeout(() => console.log('done checking'), 2000)
            // if (user.get('id')) {
            //     //only check if they are authenticated
            // } else {
            //     //getUserData();
            // }
        } catch (error) {
            // send dat noob to the intro
            dispatch(routerActions.push('/intro'));
        }
    };
}
