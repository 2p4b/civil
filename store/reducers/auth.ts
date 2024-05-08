import { Record } from "immutable";
import * as Actions from "../actions/auth";

class AuthRecord extends Record({
    id: "",
    access_token: "",
    expires_at: 0,
    expires_in: 0,
    refresh_token: "",
    token_type: "",
    is_local: true,
    is_anonymous: true,
    timestamp: 0,
}) {
    get is_valid() {
        return Boolean(this.access_token.trim().length);
    }
}

export const state = new AuthRecord({});

export const reducers = {
    [Actions.LOGGED_IN]: (app: AuthRecord, action: Actions.LoggedInAction) => {
        const { session } = action.payload;
        return new AuthRecord({...session, 
            id: session.user.id, 
            is_anonymous: false,
            timestamp: Date.now(),
        })
    },
    [Actions.LOGGED_OUT]: (_app: AuthRecord, _action: Actions.LoggedOutAction) => {
        return new AuthRecord({});
    },
};

export default { state, reducers };

