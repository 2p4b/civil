import endpoint from "@/endpoint";
import { default as Base } from "./client";
import auth from "./auth";
import school from "./school";

Object.assign(Base.prototype, ([auth, school]).reduce((acc, client) => ({...client, ...acc}), {}));

export default new Base(endpoint)
