import { put, takeEvery, select } from "redux-saga/effects";
import * as Actions from "../actions/paid";

function* createAccountSubscription(payload: any, ctx: Store.Context){
    const account = yield select(state => state.account);
    try {
        const subscription = yield Promise.resolve({
            id: "xxx-xxx-xxx",
            user_id: account.user_id,
            account_id: account.id,
            created_at: new Date().toISOString(),
            account_plan_id: payload.plan_id,
        });
        payload.resolve.success(subscription);
        yield put(Actions.accountSubscriptionCreated(subscription));
    } catch (error) {
        payload.resolve.reject(error);
    }
}

function* cancelAccountSubscription(payload: any, ctx: Store.Context){
    const account = yield select(state => state.account);
    try {
        const subscription = yield Promise.resolve({
            id: payload.id,
        });
        payload.resolve.success(subscription);
        yield put(Actions.accountSubscriptionCancelled(subscription));
    } catch (error) {
        payload.resolve.reject(error);
    }
}


export default [
    { effect: takeEvery, type: Actions.CREATE_ACCOUNT_SUBSCRIPTION, handler: createAccountSubscription },
    { effect: takeEvery, type: Actions.CANCEL_ACCOUNT_SUBSCRIPTION, handler: cancelAccountSubscription },
];


