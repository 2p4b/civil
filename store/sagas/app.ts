import { put, takeEvery, select } from "redux-saga/effects";
import * as Actions from "../actions/app";

function* init(payload: any, ctx: Store.Context){
}

export default [
    { effect: takeEvery, type: Actions.INIT, handler: init },
];
