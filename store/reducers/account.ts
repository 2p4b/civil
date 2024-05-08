import { Record } from "immutable";
import * as Actions from "../actions/account";
import { create } from "./table";
import { UserAccount } from "../records";

const UserAccountsTable = create(UserAccount, "accounts");

export const state = new UserAccountsTable();

export const reducers = {

};

export default { state, reducers };


