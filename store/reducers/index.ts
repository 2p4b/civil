import { Record } from "immutable";
import app from "./app";
import auth from "./auth";
import users from "./users";

const INIT = "@@INIT";

const RootStates = {
    app: app.state,
    auth: auth.state,
    users: users.state,
};

const reducers = {
    app: createReducer(app.reducers, app.state),
    auth: createReducer(auth.reducers, auth.state),
    users: createReducer(users.reducers, users.state),
};

interface IAction extends Store.Action{}

interface IHandlers<T> {
    [type: string]: (state: T, action: IAction) => T;
}

export class RootStateRecord extends Record(RootStates, "root") { }

export const RootState = new RootStateRecord({});

export type RootStateT = typeof RootState;

function createReducer<T>(
    handlers: IHandlers<T>,
    defaultState: T
): (state: T, action: IAction) => T {
    type ActionType = keyof typeof handlers;

    const actions: ActionType[] = Object.keys(handlers);

    if (actions.includes(INIT)) {
        return (state: T = defaultState, action: IAction): T => {
            if (actions.includes(action.type)) {
                return handlers[action.type](state, action);
            } else {
                return state;
            }
        };
    } else {
        return (state: T = defaultState, action: IAction): T => {
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

export type Store = keyof typeof reducers;

const stores = Object.keys(reducers) as Store[];

function validatePartition(state: RootStateT, value: Store) {
    if (!state.has(value)) {
        throw Error("Unkown store partition " + value);
    }
    if (!(value in reducers)) {
        throw Error("No reducers defined for store partition " + value);
    }
}

export default function rootReducer(state = RootState, action: Store.Action) {
    return state.withMutations((state) => {
        stores.forEach((partition: Store) => {
            validatePartition(state, partition);
            const current = state.get(partition)!;
            const reducer = reducers[partition];
            const next = reducer(current as any, action as Store.Action);
            state.set(partition, next);
        });
    });
}
