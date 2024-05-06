import { createAction, createIOAction } from "@/store/action";

export const LOAD_PAID_SUBSCRIPTION = "LOAD_PAID_SUBSCRIPTION";
export type LOAD_PAID_SUBSCRIPTION = typeof LOAD_PAID_SUBSCRIPTION;
export interface LoadPaidSubscriptionPayload {
    id: string;
}
export interface PaidSubscription {
    id: string;
    plan_id: string;
    account_id: string;
    paused_at?: string;
    created_at: string;
}

export type LoadPaidSubscriptionAction = Store.IOAction<LOAD_PAID_SUBSCRIPTION, LoadPaidSubscriptionPayload, PaidSubscription>;

export function loadPaidSubscription(payload: LoadPaidSubscriptionPayload):  LoadPaidSubscriptionAction {
    return createIOAction<LOAD_PAID_SUBSCRIPTION>(LOAD_PAID_SUBSCRIPTION, payload);
}

export const PAID_SUBSCRIPTION_LOADED = "PAID_SUBSCRIPTION_LOADED";
export type PAID_SUBSCRIPTION_LOADED = typeof PAID_SUBSCRIPTION_LOADED;
export type PaidSubscriptionLoadedAction = Store.Action<PAID_SUBSCRIPTION_LOADED, PaidSubscription>;
export function paidSubscriptionLoaded(payload: PaidSubscription):  PaidSubscriptionLoadedAction {
    return createAction<PAID_SUBSCRIPTION_LOADED>(PAID_SUBSCRIPTION_LOADED, payload);
}

export const LOAD_PAID_SUBSCRIPTIONS = "LOAD_PAID_SUBSCRIPTIONS";
export type LOAD_PAID_SUBSCRIPTIONS = typeof LOAD_PAID_SUBSCRIPTIONS;
export interface LoadPaidSubscriptionsPayload {
    account_id?: string;
}
export type LoadPaidSubscriptionsAction = Store.IOAction<LOAD_PAID_SUBSCRIPTIONS, LoadPaidSubscriptionsPayload, PaidSubscription[]>;
export function loadPaidSubscriptions(payload: LoadPaidSubscriptionsPayload):  LoadPaidSubscriptionsAction {
    return createIOAction<LOAD_PAID_SUBSCRIPTIONS>(LOAD_PAID_SUBSCRIPTIONS, payload);
}

export const PAID_SUBSCRIPTIONS_LOADED = "PAID_SUBSCRIPTIONS_LOADED";
export type PAID_SUBSCRIPTIONS_LOADED = typeof PAID_SUBSCRIPTIONS_LOADED;
export type PaidSubscriptionsLoadedAction = Store.Action<PAID_SUBSCRIPTIONS_LOADED, PaidSubscription[]>;
export function paidSubscriptionsLoaded(payload: PaidSubscription[]):  PaidSubscriptionsLoadedAction {
    return createAction<PAID_SUBSCRIPTIONS_LOADED>(PAID_SUBSCRIPTIONS_LOADED, payload);
}

export const DROP_PAID_SUBSCRIPTION = "DROP_PAID_SUBSCRIPTION";
export type DROP_PAID_SUBSCRIPTION = typeof DROP_PAID_SUBSCRIPTION;
export interface DropPaidSubscriptionPayload {
    id: string;
}
export interface PaidSubscriptionDroppedPayload {
    id: string;
}
export type DropPaidSubscriptionAction = Store.IOAction<DROP_PAID_SUBSCRIPTION, DropPaidSubscriptionPayload, PaidSubscriptionDroppedPayload>;
export function dropPaidSubscription(payload: DropPaidSubscriptionPayload):  DropPaidSubscriptionAction {
    return createIOAction<DROP_PAID_SUBSCRIPTION>(DROP_PAID_SUBSCRIPTION, payload);
}

export const PAID_SUBSCRIPTION_DROPPED = "PAID_SUBSCRIPTION_DROPPED";
export type PAID_SUBSCRIPTION_DROPPED = typeof PAID_SUBSCRIPTION_DROPPED;
export type PaidSubscriptionDroppedAction = Store.Action<PAID_SUBSCRIPTION_DROPPED, PaidSubscriptionDroppedPayload>;
export function paidSubscriptionDropped(payload: PaidSubscriptionDroppedPayload):  PaidSubscriptionDroppedAction {
    return createAction<PAID_SUBSCRIPTION_DROPPED>(PAID_SUBSCRIPTION_DROPPED, payload);
}

export const CREATE_PAID_SUBSCRIPTION = "CREATE_PAID_SUBSCRIPTION";
export type CREATE_PAID_SUBSCRIPTION = typeof CREATE_PAID_SUBSCRIPTION;

export interface CreatePaidSubscriptionPayload {
    plan_id: string;
    account_id: string;
}

export interface PaidSubscriptionPayload {
    id: string;
    plan_id: string;
    account_id: string;
    paused_at?: string;
    created_at: string;
}

export type CreatePaidSubscriptionAction = Store.IOAction<CREATE_PAID_SUBSCRIPTION, CreatePaidSubscriptionPayload, PaidSubscriptionPayload>;

export function createPaidSubscription(payload: CreatePaidSubscriptionPayload ):  CreatePaidSubscriptionAction {
    return createIOAction<CREATE_PAID_SUBSCRIPTION>(CREATE_PAID_SUBSCRIPTION, payload);
}

export const UPDATE_PAID_SUBSCRIPTION = "UPDATE_PAID_SUBSCRIPTION";
export type UPDATE_PAID_SUBSCRIPTION = typeof UPDATE_PAID_SUBSCRIPTION;
export interface UpdatePaidSubscriptionPayload {
    id: string;
    paused_at?: string;
}
export type UpdatePaidSubscriptionAction = Store.IOAction<UPDATE_PAID_SUBSCRIPTION, UpdatePaidSubscriptionPayload, PaidSubscriptionPayload>;
export function updatePaidSubscription(payload: UpdatePaidSubscriptionPayload):  UpdatePaidSubscriptionAction {
    return createIOAction<UPDATE_PAID_SUBSCRIPTION>(UPDATE_PAID_SUBSCRIPTION, payload);
}


export const PAID_SUBSCRIPTION_UPDATED = "PAID_SUBSCRIPTION_UPDATED";
export type PAID_SUBSCRIPTION_UPDATED = typeof PAID_SUBSCRIPTION_UPDATED;
export type PaidSubscriptionUpdatedAction = Store.Action<PAID_SUBSCRIPTION_UPDATED, PaidSubscription>;
export function paidSubscriptionUpdated(payload: PaidSubscription):  PaidSubscriptionUpdatedAction {
    return createAction<PAID_SUBSCRIPTION_UPDATED>(PAID_SUBSCRIPTION_UPDATED, payload);
}

export const PAUSE_PAID_SUBSCRIPTION = "PAUSE_PAID_SUBSCRIPTION";
export type PAUSE_PAID_SUBSCRIPTION = typeof PAUSE_PAID_SUBSCRIPTION;
export interface PausePaidSubscriptionPayload {
    id: string;
}
export type PausePaidSubscriptionAction = Store.IOAction<PAUSE_PAID_SUBSCRIPTION, PausePaidSubscriptionPayload, PaidSubscriptionPayload>;
export function pausePaidSubscription(payload: PausePaidSubscriptionPayload):  PausePaidSubscriptionAction {
    return createIOAction<PAUSE_PAID_SUBSCRIPTION>(PAUSE_PAID_SUBSCRIPTION, payload);
}

export const RESUME_PAID_SUBSCRIPTION = "RESUME_PAID_SUBSCRIPTION";
export type RESUME_PAID_SUBSCRIPTION = typeof RESUME_PAID_SUBSCRIPTION;
export interface ResumePaidSubscriptionPayload {
    id: string;
}
export type ResumePaidSubscriptionAction = Store.IOAction<RESUME_PAID_SUBSCRIPTION, ResumePaidSubscriptionPayload, PaidSubscriptionPayload>;
export function resumePaidSubscription(payload: ResumePaidSubscriptionPayload):  ResumePaidSubscriptionAction {
    return createIOAction<RESUME_PAID_SUBSCRIPTION>(RESUME_PAID_SUBSCRIPTION, payload);
}

