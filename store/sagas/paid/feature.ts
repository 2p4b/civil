import { put, takeEvery, select } from "redux-saga/effects";
import * as Actions from "../../actions/paid";

function * loadPaidFeatures(action: Actions.LoadPaidFeaturesAction, ctx: Store.Context){
    try {
        const features = yield Promise.resolve([
            { id: "xxx-xxx-xxx", name: "Feature 1", description: "Feature 1 description" },
            { id: "xxx-xxx-xxx", name: "Feature 2", description: "Feature 2 description" },
            { id: "xxx-xxx-xxx", name: "Feature 3", description: "Feature 3 description" },
        ]);
        action.resolve.success(features);
        yield put(Actions.paidFeaturesLoaded(features));
    } catch (error) {
        action.resolve.reject(error);
    }
}

function * loadPaidFeature(action: Actions.LoadPaidFeatureAction, ctx: Store.Context){
    try {
        const feature = yield Promise.resolve({
            id: action.payload.id,
            name: "Feature 1",
            description: "Feature 1 description",
        });
        action.resolve.success(feature);
        yield put(Actions.paidFeatureLoaded(feature));
    } catch (error) {
        action.resolve.reject(error);
    }
}

function * createPaidFeature(action: Actions.CreatePaidFeatureAction, ctx: Store.Context){
    try {
        const feature = yield Promise.resolve({
            id: "xxx-xxx-xxx",
            name: action.payload.name,
            description: "Feature 1 description",
        });
        action.resolve.success(feature);
        yield put(Actions.paidFeatureCreated(feature));
    } catch (error) {
        action.resolve.reject(error);
    }
}

function * updatePaidFeature(action: Actions.UpdatePaidFeatureAction, ctx: Store.Context){
    try {
        const feature = yield Promise.resolve({
            id: action.payload.id,
            name: action.payload.name,
            description: action.payload.description,
        });
        action.resolve.success(feature);
        yield put(Actions.paidFeatureUpdated(feature));
    } catch (error) {
        action.resolve.reject(error);
    }
}

function * dropPaidFeature(action: Actions.DropPaidFeatureAction, ctx: Store.Context){
    try {
        const feature = yield Promise.resolve({
            id: action.payload.id,
        });
        action.resolve.success(feature);
        yield put(Actions.paidFeatureDropped(feature));
    } catch (error) {
        action.resolve.reject(error);
    }
}

export default [
    { effect: takeEvery, type: Actions.LOAD_PAID_FEATURES, handler: loadPaidFeatures },
    { effect: takeEvery, type: Actions.LOAD_PAID_FEATURE, handler: loadPaidFeature },
    { effect: takeEvery, type: Actions.CREATE_PAID_FEATURE, handler: createPaidFeature },
    { effect: takeEvery, type: Actions.UPDATE_PAID_FEATURE, handler: updatePaidFeature },
    { effect: takeEvery, type: Actions.DROP_PAID_FEATURE, handler: dropPaidFeature },
];
