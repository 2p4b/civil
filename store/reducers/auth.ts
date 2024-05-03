import { Record } from "immutable";
import * as Actions from "../actions/auth";

class AuthRecord extends Record({
    id: "",
    token: "",
    is_local: true,
    is_anonymous: true,
    timestamp: 0,
}) {
    get is_valid() {
        return Boolean(this.token.trim().length);
    }
}

export const state = new AuthRecord({});

export const reducers = {
    [Actions.LOGGED_IN]: (app: AuthRecord, action: Actions.LoggedInAction) => {
        const session = action.payload;
        return app.set("id", session.id)
            .set("token", session.token)
            .set("timestamp", Date.now())
            .set("is_local", true)
            .set("is_anonymous", false);
    },
    [Actions.LOGGED_OUT]: (_app: AuthRecord, _action: Actions.LoggedOutAction) => {
        return new AuthRecord({});
    },
};

export default { state, reducers };

