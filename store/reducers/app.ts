import { Record } from "immutable";
import * as Actions from "../actions/app";
import { App } from "../records";

export const state = new App({});

export const reducers = {
    [Actions.INIT]: (app: App, payload: Actions.InitAction) => {
        return app;
    },
};

export default { state, reducers };
