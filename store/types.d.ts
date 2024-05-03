import { takeEvery } from "redux-saga/effects";
import { createStore } from "redux";

export type Id = string;

declare global {

    type SagaContext = 1;

    namespace Store {

        export interface Unique {
            id: Id;
        }

        export type Context = ReturnType<typeof createStore> & { client: any }


        export interface Positioned {
            index: number;
        }

        export interface IReducerMap<StoreState> {
            readonly [type: string]: (store: StoreState, action: Action) => StoreState;
        }

        export interface IHandler<Type = string, Payload = any> {
            type: Type;
            effect: typeof takeEvery;
            handle: (action: Action<Payload>) => Iterable<any>;
        }

        export interface CommandAction<Type = string> {
            // Typescript action type is not ready yet
            // readonly type: Type;
            readonly type: any;
        }

        export interface Action<Type = string, Payload = any, Meta = any>
            extends CommandAction<Type> {
            readonly id: Id;
            readonly ts: number;
            readonly payload: Payload;
            readonly metadata?: Meta;
        }

        export interface AsyncResolver<Success = any, Error = any> {
            error(error: Error): void;
            success(callback: Success): void;
        }

        export interface AsyncAction<T, P, S = any, E = any> extends Action<T, P> {
            then<RSuccess, RReject>(
                onFullfill: (data: S) => RSuccess,
                onReject?: (error: E) => RReject
            ): Promise<RSuccess | RReject>;
            catch<CReturn = never>(
                callback: (error: E) => CReturn
            ): Promise<S | CReturn>;
            finally<FReturn = never>(callback: () => FReturn): Promise<S | FReturn>;
            readonly resolve: AsyncResolver<S, E>;
        }

        export interface IOAction<Type, Payload, Success = any, Meta = any, Error = any>
            extends AsyncAction<Type, Payload, Success, Error> {
            readonly signal: AbortSignal;
            readonly metadata: Meta;
            readonly resolve: AsyncResolver<Success, Error>;
            abort(reason: string): void;
        }

    }

}

