import { Record } from "immutable";
import * as AuthActions from "../actions/auth";
import { create } from "./table";
import { User } from "../records";

const UsersTable = create(User, "users");

export const state = new UsersTable();

export const reducers = {
    [AuthActions.LOGGED_IN](users, action){
        return users.put(action.payload.user.id, action.payload.user);
    }
};

export default { state, reducers };

