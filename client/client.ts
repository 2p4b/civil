export default class Client {

    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    get auth() {
        return this.endpoint.auth;
    }
}


