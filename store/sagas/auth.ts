import { put, takeEvery, select } from "redux-saga/effects";
import * as Actions from "../actions/auth";

const SIGNED_IN = "SIGNED_IN";


function* passwordLogin(action: Actions.PasswordLoginAction, ctx: Store.Context){
    const email = action.payload.username;
    const password = action.payload.password;
    try {
        const { data, error} = yield ctx.client.loginWithEmail({email, password});
        if (error) {
            action.resolve.error({data, error});
        } else {
            action.resolve.success(data);
            yield put(Actions.loggedIn(data));
        }
    }catch(e){
        action.resolve.error(e);
    }
}

function* signup(action: Actions.AuthSignupAction, ctx: Store.Context){
    const email = action.payload.username;
    const password = action.payload.password;
    const session = ctx.client.registerWithEmail({email, password});
    action.resolve.success(session);
    yield put(Actions.loggedIn(session));
}

function* logout(action: Actions.LogoutAction, ctx: Store.Context){
    const { data, error } = ctx.client.logout();
    if (error) {
        action.resolve.error({data, error});
    } else {
        action.resolve.success(data);
        yield put(Actions.loggedOut(data));
    }
}

export default [
    { effect: takeEvery, type: Actions.PASSWORD_LOGIN, handler: passwordLogin },
    { effect: takeEvery, type: Actions.AUTH_SIGNUP, handler:  signup},
    { effect: takeEvery, type: Actions.LOGOUT, handler: logout },
];

