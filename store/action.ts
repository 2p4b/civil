import * as Crypto from 'expo-crypto';

function UUID() {
    return Crypto.randomUUID()
}

export function createAction<Type = string, Payload = any, Meta = any>(
    type: Type,
    payload: Payload,
    metadata?: Meta
): Store.Action<Type, Payload> {
    const id = UUID();
    return { id, type, payload, metadata: metadata ?? {}, ts: Date.now() };
}

export function createIOAction<
    Type = string,
    Payload = any,
    Success = any,
    Meta = any
>(type: Type, payload: Payload, metadata?: Meta): Store.IOAction<Type, Payload> {
    let error: (reason: any) => void = (_error) => {throw "[SHOULD NOT HAPPEN]"};

    let success: (data: Success) => void = (_data) => {throw "[SHOULD NOT HAPPEN]"};

    let promise = new Promise<Success>((res, rej) => {
        error = rej;
        success = res;
    });

    const id = UUID();

    const controller = new AbortController();

    return {

        id: id,

        type: type,

        metadata: metadata ?? {},

        resolve: { error, success },

        payload: payload,

        signal: controller.signal,

        catch: <R>(callback: (error: any) => R) => {
            return promise.catch(callback);
        },

        then: <R = never, E = never>(
            onFullfill: (data: Success) => R,
            onReject?: (error: string) => E
        ) => {
            return promise.then(onFullfill, onReject);
        },

        abort: () => {
            return controller.abort();
        },

        finally: <R>(callback: () => R) => {
            return promise.finally(callback);
        },

        ts: Date.now(),
    };
}
