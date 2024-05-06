import { createAction, createIOAction } from "@/store/action";

export const LOAD_PAID_PLANS = "LOAD_PAID_PLANS";
export type LOAD_PAID_PLANS = typeof LOAD_PAID_PLANS;
export interface LoadPaidPlansPayload {}
export interface PaidPlan {
    id: string;
    name: string;
    amount: number;
    interval: string;
    created_at: string;
}
export type LoadPaidPlansAction = Store.IOAction<LOAD_PAID_PLANS, LoadPaidPlansPayload, PaidPlan[]>;
export function loadPaidPlans(payload: LoadPaidPlansPayload): LoadPaidPlansAction {
    return createIOAction<LOAD_PAID_PLANS>(LOAD_PAID_PLANS, payload);
}

export const LOAD_PAID_PLAN = "LOAD_PAID_PLAN";
export type LOAD_PAID_PLAN = typeof LOAD_PAID_PLAN;
export interface LoadPaidPlanPayload {
    id: string;
}
export type LoadPaidPlanAction = Store.IOAction<LOAD_PAID_PLAN, LoadPaidPlanPayload, PaidPlan>;
export function loadPaidPlan(payload: LoadPaidPlanPayload): LoadPaidPlanAction {
    return createIOAction<LOAD_PAID_PLAN>(LOAD_PAID_PLAN, payload);
}

export const PAID_PLANS_LOADED = "PAID_PLANS_LOADED";
export type PAID_PLANS_LOADED = typeof PAID_PLANS_LOADED;
export type PaidPlansLoadedAction = Store.Action<PAID_PLANS_LOADED, PaidPlan[]>;
export function paidPlansLoaded(payload: PaidPlan[]): PaidPlansLoadedAction {
    return createAction<PAID_PLANS_LOADED>(PAID_PLANS_LOADED, payload);
}

export const PAID_PLAN_LOADED = "PAID_PLAN_LOADED";
export type PAID_PLAN_LOADED = typeof PAID_PLAN_LOADED;
export type PaidPlanLoadedAction = Store.Action<PAID_PLAN_LOADED, PaidPlan>;
export function paidPlanLoaded(payload: PaidPlan): PaidPlanLoadedAction {
    return createAction<PAID_PLAN_LOADED>(PAID_PLAN_LOADED, payload);
}


export const CREATE_PAID_PLAN = "CREATE_PAID_PLAN";
export type CREATE_PAID_PLAN = typeof CREATE_PAID_PLAN;
export interface CreatePaidPlanPayload {
    name: string;
    price: number;
    interval: string;
}

export interface PaidPlanPayload {
    id: string;
    name: string;
    price: number;
    interval: string;
    created_at: string;
}

export type CreatePaidPlanAction = Store.IOAction<CREATE_PAID_PLAN, CreatePaidPlanPayload, PaidPlanPayload>;

export function createPaidPlan(payload: CreatePaidPlanPayload): CreatePaidPlanAction {
    return createIOAction<CREATE_PAID_PLAN>(CREATE_PAID_PLAN, payload);
}

export const PAID_PLAN_CREATED = "PAID_PLAN_CREATED";
export type PAID_PLAN_CREATED = typeof PAID_PLAN_CREATED;
export type PaidPlanCreatedAction = Store.Action<PAID_PLAN_CREATED, PaidPlanPayload>;
export function paidPlanCreated(payload: PaidPlanPayload): PaidPlanCreatedAction {
    return createAction<PAID_PLAN_CREATED>(PAID_PLAN_CREATED, payload);
}

export const UPDATE_PAID_PLAN = "UPDATE_PAID_PLAN";
export type UPDATE_PAID_PLAN = typeof UPDATE_PAID_PLAN;
export interface UpdatePaidPlanPayload {
    id: string;
    name: string;
    price: number;
    interval: string;
}
export type UpdatePaidPlanAction = Store.IOAction<UPDATE_PAID_PLAN, UpdatePaidPlanPayload, PaidPlanPayload>;
export function updatePaidPlan(payload: UpdatePaidPlanPayload): UpdatePaidPlanAction {
    return createIOAction<UPDATE_PAID_PLAN>(UPDATE_PAID_PLAN, payload);
}

export const PAID_PLAN_UPDATED = "PAID_PLAN_UPDATED";
export type PAID_PLAN_UPDATED = typeof PAID_PLAN_UPDATED;
export type PaidPlanUpdatedAction = Store.Action<PAID_PLAN_UPDATED, PaidPlanPayload>;
export function paidPlanUpdated(payload: PaidPlanPayload): PaidPlanUpdatedAction {
    return createAction<PAID_PLAN_UPDATED>(PAID_PLAN_UPDATED, payload);
}

export const DROP_PAID_PLAN = "DROP_PAID_PLAN";
export type DROP_PAID_PLAN = typeof DROP_PAID_PLAN;
export interface DropPaidPlanPayload {
    id: string;
}
export interface PaidPlanDroppedPayload {
    id: string;
}
export type DropPaidPlanAction = Store.IOAction<DROP_PAID_PLAN, DropPaidPlanPayload, PaidPlanDropPayload>;
export function dropPaidPlan(payload: DropPaidPlanPayload): DropPaidPlanAction {
    return createIOAction<DROP_PAID_PLAN>(DROP_PAID_PLAN, payload);
}

export const PAID_PLAN_DROPED = "PAID_PLAN_DROPED";
export type PAID_PLAN_DROPED = typeof PAID_PLAN_DROPED;
export type PaidPlanDropedAction = Store.Action<PAID_PLAN_DROPED, PaidPlanDeletedPayload>;
export function paidPlanDroped(payload: PaidPlanDeletedPayload): PaidPlanDropedAction {
    return createAction<PAID_PLAN_DROPED>(PAID_PLAN_DROPED, payload);
}

