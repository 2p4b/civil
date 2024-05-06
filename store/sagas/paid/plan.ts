import { put, takeEvery, select } from "redux-saga/effects";
import * as Actions from "../../actions/paid";

function* loadPaidPlan(action: Actions.LoadPaidPlanAction, ctx: Store.Context){
    try {
        const plan = yield Promise.resolve({
            id: action.payload.id,
            name: "Basic",
            price: 9.99,
            billing: "monthly",
            description: "Basic plan",
            created_at: new Date().toISOString(),
        });
        payload.resolve.success(plan);
        yield put(Actions.paidPlanLoaded(plan));
    } catch (error) {
        payload.resolve.reject(error);
    }
}

function* loadPaidPlans(action: Actions.LoadPaidPlansAction, ctx: Store.Context){
    try {
        const plans = yield Promise.resolve([
            {
                id: "xxx-xxx-xxx",
                name: "Basic",
                price: 9.99,
                billing: "monthly",
                description: "Basic plan",
                created_at: new Date().toISOString(),
            }
        ]);
        payload.resolve.success(plans);
        yield put(Actions.paidPlansLoaded(plans));
    } catch (error) {
        payload.resolve.reject(error);
    }
}

function* createPaidPlan(action: Actions.CreatePaidPlanActin, ctx: Store.Context){
    try {
        const plan = yield Promise.resolve({
            id: "xxx-xxx-xxx",
            name: action.payload.name,
            price: action.payload.price,
            billing: action.payload.billing,
            description: action.payload.description,
            created_at: new Date().toISOString(),
        });
        payload.resolve.success(plan);
        yield put(Actions.paidPlanLoaded(plan));
    } catch (error) {
        payload.resolve.reject(error);
    }
}

function* updatePaidPlan(action: Actions.UpdatePaidPlanAction, ctx: Store.Context){
    try {
        const plan = yield Promise.resolve({
            id: action.payload.id,
            name: action.payload.name,
            price: action.payload.price,
            billing: action.payload.billing,
            description: action.payload.description,
        });
        payload.resolve.success(plan);
        yield put(Actions.paidPlanUpdated(plan));
    } catch (error) {
        payload.resolve.reject(error);
    }
}

function* dropPaidPlan(action: Actions.DropPaidPlanAction, ctx: Store.Context){
    try {
        const plan = yield Promise.resolve({
            id: action.payload.id,
        });
        payload.resolve.success(plan);
        yield put(Actions.paidPlanDropped(plan));
    } catch (error) {
        payload.resolve.reject(error);
    }
}

const listeners = [
    { effect: takeEvery, type: Actions.LOAD_PAID_PLAN, handler: loadPaidPlan },
    { effect: takeEvery, type: Actions.LOAD_PAID_PLANS, handler: loadPaidPlans },
    { effect: takeEvery, type: Actions.CREATE_PAID_PLAN, handler: createPaidPlan },
    { effect: takeEvery, type: Actions.UPDATE_PAID_PLAN, handler: updatePaidPlan },
    { effect: takeEvery, type: Actions.DROP_PAID_PLAN, handler: dropPaidPlan },
];
export default listeners;


