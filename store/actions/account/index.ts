import { createAction, createIOAction } from "@/store/action";

export const LOAD_ACCOUNT = "LOAD_ACCOUNT";
export type LOAD_ACCOUNT = typeof LOAD_ACCOUNT;

export interface LoadAccountPayload {
    id: string;
}
export interface AccountPayload {
    id: string;
    user_id: string;
    created_at: string;
}
export type LoadAccountAction = Store.IOAction<LOAD_ACCOUNT, LoadAccountPayload, AccountPayload>;
export function loadAccount(payload: LoadAccountPayload):  LoadAccountAction {
    return createIOAction<LOAD_ACCOUNT>(LOAD_ACCOUNT, payload);
}

export const ACCOUNT_LOADED = "ACCOUNT_LOADED";
export type ACCOUNT_LOADED = typeof ACCOUNT_LOADED;
export type AccountLoadedAction = Store.Action<ACCOUNT_LOADED, AccountPayload>;
export function accountLoaded(payload: AccountPayload):  AccountLoadedAction {
    return createAction<ACCOUNT_LOADED>(ACCOUNT_LOADED, payload);
}


export const ACCOUNTS_UPDATED = "ACCOUNTS_UPDATED";
export type ACCOUNTS_UPDATED = typeof ACCOUNTS_UPDATED;
export type AccountsUpdatedAction = Store.Action<ACCOUNTS_UPDATED, AccountPayload>;
export function accountsUpdated(payload: AccountPayload):  AccountsUpdatedAction {
    return createAction<ACCOUNTS_UPDATED>(ACCOUNTS_UPDATED, payload);
}

export const DROP_ACCOUNT = "DROP_ACCOUNT";
export type DROP_ACCOUNT = typeof DROP_ACCOUNT;
export interface DropAccountPayload { id: string }
export interface AccountDroppedPayload { id: string }
export type DropAccountAction = Store.IOAction<DROP_ACCOUNT, DropAccountPayload, AccountDroppedPayload>;
export function dropAccount(payload: DropAccountPayload):  DropAccountAction {
    return createIOAction<DROP_ACCOUNT>(DROP_ACCOUNT, payload);
}

export const ACCOUNT_DROPPED = "ACCOUNT_DROPPED";
export type ACCOUNT_DROPPED = typeof ACCOUNT_DROPPED;
export type AccountDroppedAction = Store.Action<ACCOUNT_DROPPED, AccountDroppedPayload>;
export function accountDropped(payload: AccountDroppedPayload):  AccountDroppedAction {
    return createAction<ACCOUNT_DROPPED>(ACCOUNT_DROPPED, payload);
}

