import { put, takeEvery, select } from "redux-saga/effects";
import * as Actions from "../../actions/paid";

function* loadPaidSubscriptions(payload: Actions.LoadPaidSubscriptionAction, ctx: Store.Context){
    try{
        const subscriptions = yield Promise.resolve([
            {
                id: "xxx-xxx-xxx",
                account_id: payload.account_id,
                created_at: new Date().toISOString(),
                plan_id: "xxx-xxx-xxx",
            }
        ]);
        payload.resolve.success(subscriptions);
        yield put(Actions.paidSubscriptionsLoaded(subscriptions));
    } catch (error) {
        payload.resolve.reject(error);
    }
}

function* createPaidSubscription(payload: Actions.CreatePaidSubscriptionAction, ctx: Store.Context){
    try {
        const subscription = yield Promise.resolve({
            id: "xxx-xxx-xxx",
            account_id: payload.account_id,
            created_at: new Date().toISOString(),
            plan_id: payload.plan_id,
        });
        payload.resolve.success(subscription);
        yield put(Actions.paidSubscriptionLoaded(subscription));
    } catch (error) {
        payload.resolve.reject(error);
    }
}

function* dropPaidSubscription(payload: Actions.DropPaidSubscriptionAction, ctx: Store.Context){
    try {
        const subscription = yield Promise.resolve({
            id: payload.id,
        });
        payload.resolve.success(subscription);
        yield put(Actions.paidSubscriptionDropped(subscription));
    } catch (error) {
        payload.resolve.reject(error);
    }
}

function* pausePaidSubscription(payload: Actions.PausePaidSubscriptionAction, ctx: Store.Context){
    try {
        const subscription = yield Promise.resolve({
            id: payload.id,
            paused_at: new Date().toISOString(),
        });
        payload.resolve.success(subscription);
        yield put(Actions.paidSubscriptionUpdated(subscription));
    } catch (error) {
        payload.resolve.reject(error);
    }
}

function* resumePaidSubscription(payload: Actions.ResumePaidSubscriptionAction, ctx: Store.Context){
    try {
        const subscription = yield Promise.resolve({
            id: payload.id,
            paused_at: null,
        });
        payload.resolve.success(subscription);
        yield put(Actions.paidSubscriptionUpdated(subscription));
    } catch (error) {
        payload.resolve.reject(error);
    }
}

export default [
    { effect: takeEvery, type: Actions.LOAD_PAID_SUBSCRIPTIONS, handler: loadPaidSubscriptions },
    { effect: takeEvery, type: Actions.CREATE_PAID_SUBSCRIPTION, handler: createPaidSubscription },
    { effect: takeEvery, type: Actions.DROP_PAID_SUBSCRIPTION, handler: dropPaidSubscription },
    { effect: takeEvery, type: Actions.PAUSE_PAID_SUBSCRIPTION, handler: pausePaidSubscription },
    { effect: takeEvery, type: Actions.RESUME_PAID_SUBSCRIPTION, handler: resumePaidSubscription },
];

