import { ADD_TODO } from './constants';

export function addTodo() {
    return {
        type: ADD_TODO,
        todo
    };
}

export function removeTodo() {
    return {
        type: REMOVE_TODO,
        
    }
}

export function thunk() {
    return (dispatch, getState) => {
        // do stuff
    };
}

