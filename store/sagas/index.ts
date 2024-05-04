import { all, fork } from "redux-saga/effects";

const watch = (store: any, { effect, type, handler }: any) =>
    function* watcher() {
        function* wrapper(action: any) {
            yield *handler(action, store);
        }
        yield effect(type, wrapper);
    };


export default function* main(store: any) {
    const watchers = ([
        require("./app").default,
        require("./auth").default,
    ]).flat().map(watch.bind(null, store));

    const sagas = [...watchers].map(fork);

    yield all(sagas);

}
