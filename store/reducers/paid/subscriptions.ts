import { Record } from "immutable";
import * as Actions from "../../actions/paid/subscriptions";
import { create } from "../table";
import { AccountSubscription } from "../../records";

const AccountSubscriptionsTable = create(AccountSubscription, "account_subscriptions");

export let state = new AccountSubscriptionsTable();

const fake_data = Array.from({ length: 1 }, (_, i) => ({id: i.toString(), plan_id: i.toString(), user_id: i.toString(), status: "active"}));

state = fake_data.reduce((state, subscription) => AccountSubscriptionsTable.hooks.put(state, { payload: subscription }), state);

export const reducers = {
    [Actions.PAID_SUBSCRIPTION_LOADED]: AccountSubscriptionsTable.hooks.put,
    [Actions.PAID_SUBSCRIPTION_CREATED]: AccountSubscriptionsTable.hooks.put,
    [Actions.PAID_SUBSCRIPTION_CANCELLED]: AccountSubscriptionsTable.hooks.drop,
    [Actions.PAID_SUBSCRIPTION_PAUSED]: AccountSubscriptionsTable.hooks.patch,
    [Actions.PAID_SUBSCRIPTION_RESUMED]: AccountSubscriptionsTable.hooks.patch,
};

export default { state, reducers };


