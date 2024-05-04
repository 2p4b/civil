import { createAction, createIOAction } from "@/store/action";

export const PASSWORD_LOGIN = "PASSWORD_LOGIN";
export type PASSWORD_LOGIN = typeof PASSWORD_LOGIN;

export interface PasswordLoginPayload {
    username: string;
    password: string;
}

export interface LoggedInPayload {
    user: any;
    token: string;
}

export type PasswordLoginAction = Store.IOAction<INIT, {}>;

export function loginWithPassword(payload: PasswordLoginPayload):  PasswordLoginAction {
    return createIOAction<PASSWORD_LOGIN, LoggedInPayload>(PASSWORD_LOGIN, payload);
}

export const LOGOUT = "LOGOUT";
export type LOGOUT = typeof LOGOUT;
export interface LogoutPayload {}
export interface AuthLogoutPayload {}
export type LogoutAction = Store.IOAction<LOGOUT, AuthLogoutPayload>;

export function logout(payload: LogoutPayload):  LogoutAction {
    return createIOAction<LOGOUT, AuthLogoutPayload>(LOGOUT, payload);
}


export const LOGGED_IN = "LOGGE_IN";
export type LOGGED_IN = typeof LOGGED_IN;
export type LoggedInAction = Store.Action<LOGGED_IN,LoggedInPayload>;

export function loggedIn(payload: LoggedInPayload):  LoggedInAction{
    return createAction<LOGGED_IN>(LOGGED_IN, payload);
}


export const LOGGED_OUT = "LOGGED_OUT";
export type LOGGED_OUT = typeof LOGGED_OUT;

export interface LoggedOutPayload {
}
export type LoggedOutAction = Store.Action<LOGGED_OUT, LoggedOutPayload>;

export function loggedOut(payload: LoggedOutPayload): LoggedOutAction {
    return createAction<LOGGED_OUT>(LOGGED_OUT, payload ?? {});
}

export const AUTH_SIGNUP = "AUTH_SIGNUP";
export type AUTH_SIGNUP = typeof AUTH_SIGNUP;
export interface AuthSignUpPayload {}
export type AuthSignupAction = Store.Action<AUTH_SIGNUP, AuthSignUpPayload>;
export function signup(payload: AuthSignUpPayload): AuthSignupAction {
    return createIOAction<AUTH_SIGNUP, LoggedInPayload>(AUTH_SIGNUP, payload);
}

