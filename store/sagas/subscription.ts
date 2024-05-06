import { put, takeEvery, select } from "redux-saga/effects";
import * as Actions from "../actions/account";

function* createAccountSubscription(action: Actions.CreateAccountSubscription, ctx: Store.Context){
    try {
        const subscription = yield Promise.resolve({
            id: "xxx-xxx-xxx",
            account_id: action.payload.account_id,
            plan_id: action.payload.plan_id,
            created_at: new Date().toISOString(),
        });
        payload.resolve.success(subscription);
        yield put(Actions.accountSubscriptionLoaded(subscription));
    } catch (error) {
        payload.resolve.reject(error);
    }
}

function* updateAccountSubscription(action: Actions.UpdateAccountSubscription, ctx: Store.Context){
    try {
        const subscription = yield Promise.resolve({
            id: action.payload.account_id,
            paused_at: action.payload.paused_at,
        });
        payload.resolve.success(subscription);
        yield put(Actions.accountSubscriptionUpdated(subscription));
    } catch (error) {
        payload.resolve.reject(error);
    }
}

function* dropAccountSubscription(action: Actions.DropAccountSubscription, ctx: Store.Context){
    try {
        const subscription = yield Promise.resolve({
            id: action.payload.account_id,
        });
        payload.resolve.success(subscription);
        yield put(Actions.accountSubscriptionDropped(subscription));
    } catch (error) {
        payload.resolve.reject(error);
    }
}


export default [
    { effect: takeEvery, type: Actions.CREATE_ACCOUNT_SUBSCRIPTION, handler: createAccountSubscription },
    { effect: takeEvery, type: Actions.DROP_ACCOUNT_SUBSCRIPTION, handler: dropAccountSubscription },
];

