import { Record } from "immutable";
import { faker } from '@faker-js/faker';

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
