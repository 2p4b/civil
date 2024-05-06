import { createAction, createIOAction } from "@/store/action";

export const LOAD_PAID_FEATURES = "LOAD_PAID_FEATURES";
export type LOAD_PAID_FEATURES = typeof LOAD_PAID_FEATURES;
export interface LoadPaidFeaturesPayload {}
export interface PaidFeature {
    id: string;
    name: string;
    amount: number;
    interval: string;
    created_at: string;
}
export type LoadPaidFeaturesAction = Store.IOAction<LOAD_PAID_FEATURES, LoadPaidFeaturesPayload, PaidFeature[]>;
export function loadPaidFeatures(payload: LoadPaidFeaturesPayload): LoadPaidFeaturesAction {
    return createIOAction<LOAD_PAID_FEATURES>(LOAD_PAID_FEATURES, payload);
}

export const LOAD_PAID_FEATURE = "LOAD_PAID_FEATURE";
export type LOAD_PAID_FEATURE = typeof LOAD_PAID_FEATURE;
export interface LoadPaidFeaturePayload {
    id: string;
}
export type LoadPaidFeatureAction = Store.IOAction<LOAD_PAID_FEATURE, LoadPaidFeaturePayload, PaidFeature>;
export function loadPaidFeature(payload: LoadPaidFeaturePayload): LoadPaidFeatureAction {
    return createIOAction<LOAD_PAID_FEATURE>(LOAD_PAID_FEATURE, payload);
}

export const PAID_FEATURES_LOADED = "PAID_FEATURES_LOADED";
export type PAID_FEATURES_LOADED = typeof PAID_FEATURES_LOADED;
export type PaidFeaturesLoadedAction = Store.Action<PAID_FEATURES_LOADED, PaidFeature[]>;
export function paidFeaturesLoaded(payload: PaidFeature[]): PaidFeaturesLoadedAction {
    return createAction<PAID_FEATURES_LOADED>(PAID_FEATURES_LOADED, payload);
}

export const PAID_FEATURE_LOADED = "PAID_FEATURE_LOADED";
export type PAID_FEATURE_LOADED = typeof PAID_FEATURE_LOADED;
export type PaidFeatureLoadedAction = Store.Action<PAID_FEATURE_LOADED, PaidFeature>;
export function paidFeatureLoaded(payload: PaidFeature): PaidFeatureLoadedAction {
    return createAction<PAID_FEATURE_LOADED>(PAID_FEATURE_LOADED, payload);
}


export const CREATE_PAID_FEATURE = "CREATE_PAID_FEATURE";
export type CREATE_PAID_FEATURE = typeof CREATE_PAID_FEATURE;
export interface CreatePaidFeaturePayload {
    name: string;
    price: number;
    interval: string;
}

export interface PaidFeaturePayload {
    id: string;
    name: string;
    price: number;
    interval: string;
    created_at: string;
}

export type CreatePaidFeatureAction = Store.IOAction<CREATE_PAID_FEATURE, CreatePaidFeaturePayload, PaidFeaturePayload>;

export function createPaidFeature(payload: CreatePaidFeaturePayload): CreatePaidFeatureAction {
    return createIOAction<CREATE_PAID_FEATURE>(CREATE_PAID_FEATURE, payload);
}

export const PAID_FEATURE_CREATED = "PAID_FEATURE_CREATED";
export type PAID_FEATURE_CREATED = typeof PAID_FEATURE_CREATED;
export type PaidFeatureCreatedAction = Store.Action<PAID_FEATURE_CREATED, PaidFeaturePayload>;
export function paidFeatureCreated(payload: PaidFeaturePayload): PaidFeatureCreatedAction {
    return createAction<PAID_FEATURE_CREATED>(PAID_FEATURE_CREATED, payload);
}

export const UPDATE_PAID_FEATURE = "UPDATE_PAID_FEATURE";
export type UPDATE_PAID_FEATURE = typeof UPDATE_PAID_FEATURE;
export interface UpdatePaidFeaturePayload {
    id: string;
    name: string;
    price: number;
    interval: string;
}
export type UpdatePaidFeatureAction = Store.IOAction<UPDATE_PAID_FEATURE, UpdatePaidFeaturePayload, PaidFeaturePayload>;
export function updatePaidFeature(payload: UpdatePaidFeaturePayload): UpdatePaidFeatureAction {
    return createIOAction<UPDATE_PAID_FEATURE>(UPDATE_PAID_FEATURE, payload);
}

export const PAID_FEATURE_UPDATED = "PAID_FEATURE_UPDATED";
export type PAID_FEATURE_UPDATED = typeof PAID_FEATURE_UPDATED;
export type PaidFeatureUpdatedAction = Store.Action<PAID_FEATURE_UPDATED, PaidFeaturePayload>;
export function paidFeatureUpdated(payload: PaidFeaturePayload): PaidFeatureUpdatedAction {
    return createAction<PAID_FEATURE_UPDATED>(PAID_FEATURE_UPDATED, payload);
}

export const DROP_PAID_FEATURE = "DROP_PAID_FEATURE";
export type DROP_PAID_FEATURE = typeof DROP_PAID_FEATURE;
export interface DropPaidFeaturePayload {
    id: string;
}
export interface PaidFeatureDroppedPayload {
    id: string;
}
export type DropPaidFeatureAction = Store.IOAction<DROP_PAID_FEATURE, DropPaidFeaturePayload, PaidFeatureDropPayload>;
export function dropPaidFeature(payload: DropPaidFeaturePayload): DropPaidFeatureAction {
    return createIOAction<DROP_PAID_FEATURE>(DROP_PAID_FEATURE, payload);
}
export const PAID_FEATURE_DROPED = "PAID_FEATURE_DROPED";
export type PAID_FEATURE_DROPED = typeof PAID_FEATURE_DROPED;
export type PaidFeatureDropedAction = Store.Action<PAID_FEATURE_DROPED, PaidFeatureDeletedPayload>;
export function paidFeatureDroped(payload: PaidFeatureDeletedPayload): PaidFeatureDropedAction {
    return createAction<PAID_FEATURE_DROPED>(PAID_FEATURE_DROPED, payload);
}
