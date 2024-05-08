import { Record, List } from "immutable";
import { faker } from '@faker-js/faker';

export class ChatPage extends Record({
    selected: List<string>(),
    input: {},
}, "chatspage") {
    clearSelected() {
        return this.set("selected", List<string>());
    }
    clearInput() {
        return this.set("input", {});
    }
}

export class App extends Record({
    path: "home",
    title: "Civil",
    version: "0.1.0",
}) {
}

export class User extends Record({
    id:"",
    username: "anon",
    password: "",
    bio: faker.lorem.sentence(),
    created_at:""
}) {

    get is_anonymous() {
        return !Boolean(this.id.trim().length);
    }

}

export class SubscriptionFeature extends Record({
    id: "",
    name: "",
    description: "",
}) {
}

export class SubscriptionPlan extends Record({
    id: "",
    name: "",
    description: "",
    price: 0.0,
    billing: "monthly",
    is_published: false,
    __lacks: List<string>(),
    __offers: List<string>(),
    __variants: List<string>(),
    __features: List<string>(),
}) {
}

export class AccountSubscription extends Record({
    id: "",
    account_id: "",
    created_at: "",
    plan_id: "",
}) {
}


export class UserAccount extends Record({
    id: "",
    user_id: "",
    active: false,
    created_at: "",
    updated_at: "",
    __subscriptions: List<string>(),
}) {
}
