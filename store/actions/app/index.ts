import { createAction, createIOAction } from "@/store/action";
import { INIT } from "./types";

export * from "./types";

export type InitAction = Store.Action<INIT, {}>;

export function initStore():  InitAction {
    return createAction(INIT, {});
}
