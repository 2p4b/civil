import { fork } from "redux-saga/effects";

const INIT = "";

const watch = ({ effect, type, handle }: Store.IHandler) =>
    function* watcher() {
        yield effect(type, handle);
    };


export function forkhandles(handles: Store.IHandler[]) {
    const watchers = handles.map(watch);
    return [...watchers].map(fork);
}

export function createReducer<T>(
    handlers: Store.IReducerMap<T>,
    defaultState: T
): (state: T, action: Store.Action) => T {
    type ActionType = keyof typeof handlers;

    const actions: ActionType[] = Object.keys(handlers);

    if (actions.includes(INIT)) {
        return (state: T = defaultState, action: Store.Action): T => {
            if (actions.includes(action.type)) {
                return handlers[action.type](state, action);
            } else {
                return state;
            }
        };
    } else {
        return (state: T = defaultState, action: Store.Action): T => {
            const { type } = action;

            if (type === INIT) {
                return defaultState;
            } else if (actions.includes(type)) {
                return handlers[type](state, action);
            } else {
                return state;
            }
        };
    }
}
