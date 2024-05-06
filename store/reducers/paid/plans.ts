import { Record } from "immutable";
import * as Actions from "../../actions/paid/plans";
import { create } from "../table";
import { SubscriptionPlan } from "../../records";

const SubscriptionPlansTable = create(SubscriptionPlan, "subscription_plans");

export let state = new SubscriptionPlansTable();

const fake_data = Array.from({ length: 4 }, (_, i) => ({id: i.toString(), name: `Plan ${i}`, description: `Plan ${i} description`, price: 3.99, __offers: ["0", "1"], __features: ["0", "1"] }));

state = fake_data.reduce((state, plan) => SubscriptionPlansTable.hooks.put(state, { payload: plan }), state);

export const reducers = {
    [Actions.PAID_PLAN_LOADED]: SubscriptionPlansTable.hooks.put,
    [Actions.PAID_PLAN_CREATED]: SubscriptionPlansTable.hooks.put,
    [Actions.PAID_PLAN_DROPPED]: SubscriptionPlansTable.hooks.drop,
    [Actions.PAID_PLAN_UPDATED]: SubscriptionPlansTable.hooks.patch,
};

export default { state, reducers };


