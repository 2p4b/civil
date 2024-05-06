import { Record } from "immutable";
import * as Actions from "../../actions/paid/plans";
import { create } from "../table";
import { SubscriptionFeature } from "../../records";

const SubscriptionFeaturesTable = create(SubscriptionFeature, "subscription_features");

export let state = new SubscriptionFeaturesTable();

const fake_data = Array.from({ length: 10 }, (_, i) => ({id: i.toString(), name: `Feature ${i}`, description: `Feature ${i} description` }));

state = fake_data.reduce((state, feature) => SubscriptionFeaturesTable.hooks.put(state, { payload: feature }), state);

export const reducers = {
    [Actions.PAID_FEATURE_LOADED]: SubscriptionFeaturesTable.hooks.put,
    [Actions.PAID_FEATURE_DROPPED]: SubscriptionFeaturesTable.hooks.drop,
    [Actions.PAID_FEATURE_UPDATED]: SubscriptionFeaturesTable.hooks.patch,
};

export default { state, reducers };



