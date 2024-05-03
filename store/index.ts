import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import sagas from "./sagas";
import Actions from "./actions";
import reducers, { RootState } from "./reducers";

export type State = typeof RootState;
export * from "./actions/types";
export * from "./hooks";
export * from "./records";
export { default as Actions } from "./actions";
export type { Store } from "./reducers";

const sagaMiddleware = createSagaMiddleware();

const devTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION__({ trace: true })
    : (c: any) => c;

const middlewares = applyMiddleware(sagaMiddleware);

const enhancers = compose(middlewares, devTools);

const store = createStore(reducers, RootState, enhancers);

const init = (client: any) => {
    const args = {...store, client: client}
    sagaMiddleware.run(sagas, args);
    store.dispatch(Actions.App.initStore());
}

(store as any).init = init;

export type RootStore = typeof store;

export default store as RootStore & { init: typeof init };
