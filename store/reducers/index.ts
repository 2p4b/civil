import { Record } from "immutable";
import compose from "./table";
import app from "./app";
import auth from "./auth";
import users from "./users";
import account from "./account";
import paid from "./paid";
import { ChatPage } from "../records";
import * as Campus from "@/records";

const INIT = "@@INIT";


export const tables = compose({
    chats: ChatPage,
    events: Campus.CampusEvent,
    students: Campus.CampusStudent,
    curriculum: Campus.CampusCurriculum,
    courses: Campus.CampusCourse,
    topics: Campus.CampusTopic,
    cycles: Campus.CampusCycle,
    terms: Campus.CampusTerm,
    sessions: Campus.CampusSession,
    members: Campus.CampusMember,
    lists: Campus.StoreList,
    values: Campus.StoreValue,
});

const RootStates = {
    tables: tables.state,
    account: account.state,
    app: app.state,
    auth: auth.state,
    users: users.state,
    subscriptions: paid.subscriptions.state,
    plans: paid.plans.state,
    features: paid.features.state,
};

const reducers = {
    account: createReducer(account.reducers, account.state),
    app: createReducer(app.reducers, app.state),
    auth: createReducer(auth.reducers, auth.state),
    users: createReducer(users.reducers, users.state),
    subscriptions: createReducer(paid.subscriptions.reducers, paid.subscriptions.state),
    plans: createReducer(paid.plans.reducers, paid.plans.state),
    features: createReducer(paid.features.reducers, paid.features.state),
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
    if(tables.test(action)){
        return state.set("tables", tables.dispatch(state.tables, action));
    }
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
