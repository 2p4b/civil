import { put, takeEvery, select } from "redux-saga/effects";
import * as Actions from "../actions/auth";

const SIGNED_IN = "SIGNED_IN";


function* passwordLogin(action: Actions.PasswordLoginAction, ctx: Store.Context){
    const session = yield Promise.resolve({
        id: "xxx-xxx-xxx",
        token: "xxx-xxx-xxx",
        user: {
            id: "xxx-xxx-xxx",
            username: action.payload.username,
            password: action.payload.password,
        }
    });
    action.resolve.success(session);
    yield put(Actions.loggedIn(session));
}

function* signup(action: Actions.AuthSignupAction, ctx: Store.Context){
    const session = yield Promise.resolve({
        id: "xxx-xxx-xxx",
        token: "xxx-xxx-xxx",
        user: {
            id: "xxx-xxx-xxx",
            email: action.payload.email,
            username: action.payload.username,
            password: action.payload.password,
        }
    });
    action.resolve.success(session);
    yield put(Actions.loggedIn(session));
}

function* logout(action: Actions.LogoutAction, ctx: Store.Context){
    const session = yield Promise.resolve({});
    action.resolve.success(session);
    yield put(Actions.loggedOut(session));
}

export default [
    { effect: takeEvery, type: Actions.PASSWORD_LOGIN, handler: passwordLogin },
    { effect: takeEvery, type: Actions.AUTH_SIGNUP, handler:  signup},
    { effect: takeEvery, type: Actions.LOGOUT, handler: logout },
];

