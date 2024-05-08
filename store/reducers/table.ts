import { Record, OrderedMap, List, isImmutable } from 'immutable';
import { createAction } from '../action';

export interface IAsyncTask<T=any> {
    id: string;
    type: string;
    progress?: number;
    payload: T
}

export class AsyncTask<T=Object> extends Record<IAsyncTask>({ id: "", type: "", progress: 0, payload: {} }) { 

    constructor(task: IAsyncTask<T>) {
        if(!task.id) {
            throw new Error("Task id is required");
        }
        super(task);
    }

    setProgress(progress: number) {
        return this.set("progress", progress);
    }
}

export function create<Row extends Object, Tname = string>(row: Row, name: Tname){
    const schema = {
        row: row,
        table: name,
        tasks: List<AsyncTask>(),
        rows: OrderedMap<string, Row>(),
    }

    class Table extends Record(schema, name) {

        put(key: string, value: Object) {
            // @ts-ignore
            return this.updateIn(["rows", key], old => old ? old.merge(value) : Table.make(value));
        }

        patch(key: string, patches: Object): Table {
            // @ts-ignore
            if(this.rows.has(key)) {
                // @ts-ignore
                return this.updateIn(["rows", key], (value: any) => value.merge(patches));
            }
            return this;
        }

        drop(key: string): Table {
            // @ts-ignore
            return this.updateIn(["rows"], (rows) => rows.delete(key));
        }

        find(key: string): Row | undefined {
            return this.rows.get(key);
        }

        static make(data: Object): Row {
            let raw : any;
            if(isImmutable(data)) {
                raw = data.toJSON();
            } else {
                raw = data;
            }
            return new (row as any)(raw);
        }

        static hooks = {
            add: (table: Table, { payload }: any) => table.put(payload.id, payload),
            put: (table: Table, { payload }: any) => table.put(payload.id, payload),
            drop: (table: Table, { payload }: any) => table.drop(payload.id),   
            patch: (table: Table, { payload }: any) => table.patch(payload.id, payload),
            update: (table: Table, { payload }: any) => table.patch(payload.id, payload),
        }

    }
    return Table;
}



const reducers = {

    load(table, id, payload) {
        if(Array.isArray(payload) && (id === undefined || id === null)) {
            return payload.reduce((table, row) => table.put(row.id, row), table);
        }
        if(id == undefined || id == null) {
            throw new Error("Invalid id");
        }
        return table.put(id, payload);
    },

    drop(table, id) {
        if(Array.isArray(id)) {
            return id.reduce((table, id) => {
                return table.drop(id);
            }, table);
        }
        if(typeof id === "function") {
            const rows = table.rows.filter(id);
            return table.set("rows", rows);
        }
        if(typeof id === "object" && id.id) {
            return table.drop(id.id);
        }
        if(typeof id === "string") {
            return table.drop(id);
        }
        throw new Error("Invalid id");
    },

    update(table, id, payload) {
        if(table.rows.has(id)) {
            if(typeof payload === "function") {
                let row = table.find(id);
                let nextval = payload(row);
                if(nextval instanceof table.row) {
                    return table.setIn(["rows", id], nextval);
                }
                throw new Error(`Invalid return value from ${payload} Must return a new ${table.row} object`);
            } 
            return table.updateIn(["rows", id], (row) => row.merge(payload));
        }
        return table;
    },

    set(table, id, field, payload) {
        if(table.rows.has(id) && table.rows.get(id).has(field)) {

            // Need to create a swap variable to avoid
            // having the value reference iself as
            // the payload if it is a function
            let value = payload;
            if(typeof payload !== "function") {
                value = () => payload; 
            }
            return table.updateIn(["rows", id, field], value);
        }
        return table;
    }
    
}

const handlers = Object.keys(reducers);

export default function compose(tables){

    let handles = handlers.join("|");
    let tablenames = Object.keys(tables).join("|");
    let reg1 = "@table/(?<handle>" + handles + ")";
    let reg2 = reg1 + "/(?<table>" + tablenames+ ")";
    let reg3 = reg2 + "/(?<id>[a-zA-Z0-9]+)";
    let reg4 = reg3 + "/(?<field>[a-zA-Z0-9]+)";

    const layout = Object.entries(tables).reduce((acc, [name, row]) => {
        const table = create(row, name);
        acc[name] = new table({});
        return acc;
    }, {});

    class Tables extends Record(layout, "tables") {}

    class DispatchType {
        constructor(parts=[]) {
            this.__parts = parts;
            return new Proxy(this, this);
        }
        get(_lhs, type) {
            let val = this[type];
            if(val) {
                return val;
            }
            if(typeof type == "string") {
                if(this.__parts.length == 0) {
                    if(type.match(handles)) {
                        return new DispatchType([type]);
                    }
                    throw new Error(`Invalid operation ${type}`);
                }
                if(this.__parts.length == 1) {
                    if(type.match(tablenames)) {
                        return new DispatchType([...this.__parts, type]);
                    }
                    throw new Error(`Invalid table name ${type}`);
                }
                if(this.__parts.length == 2) {
                    if(type.match(/[a-zA-Z0-9]+/)) {
                        return new DispatchType([...this.__parts, type]);
                    }
                    throw new Error(`Invalid id ${type}`);
                }
                if(this.__parts.length == 3) {
                    let sample = new (layout[this.__parts[1]].row)({});
                    if(Object.keys(sample.toJSON()).includes(type)) {
                        return new DispatchType([...this.__parts, type]);
                    }
                    throw new Error(`Invalid field ${type}`);
                }
                throw new Error(`Invalid operation ${type}`);
            }
        }
        get toJSON(){
            return this.toJSON;
        }
        toString() {
            return `@table/${this.__parts.join("/")}`;
        }
    }

    const builder = new DispatchType();

    return {
        state: new Tables({}),
        test({type}){
            return Boolean(type.match(reg2));
        },
        types: new DispatchType(),
        actions: {
            set(table, id, field, payload, meta={}) {
                const type = builder.set[table][id][field].toString();
                return createAction(type, payload, meta);
            },
            update(table, id, payload, meta={}) {
                const type = builder.update[table][id].toString();
                return createAction(type, payload, meta);
            },
            drop(table, id, meta={}) {
                const type = builder.drop[table][id].toString();
                return createAction(type, {}, meta);
            },
            load(table, id, payload, meta={}) {
                const type = builder.load[table][id].toString();
                return createAction(type, payload, meta);
            }

        },
        dispatch(state, action){
            const { type } = action;
            let match = type.match(reg4);
            if(match && match.groups.handle === "set") {
                let { handle, table, id, field } = match.groups;
                const nstate = reducers[handle](state.get(table), id, field, action.payload);
                return state.set(table, nstate);
            }

            match = type.match(reg3);
            if(match && match.groups.handle === "update") {
                let { handle, table, id } = match.groups;
                const nstate = reducers[handle](state.get(table), id, action.payload);
                return state.set(table, nstate);
            }
            if(match && match.groups.handle === "drop") {
                let { handle, table, id } = match.groups;
                const nstate = reducers[handle](state.get(table), id);
                return state.set(table, nstate);
            }
            if(match && match.groups.handle === "load") {
                let { handle, table, id } = match.groups;
                const nstate = reducers[handle](state.get(table), id, action.payload);
                return state.set(table, nstate);
            }

            match = type.match(reg2);
            if(match && match.groups.handle === "drop") {
                let { handle, table } = match.groups;
                const nstate = reducers[handle](state.get(table), action.payload);
                return state.set(table, nstate);
            }
            if(match && match.groups.handle === "load" && (action.payload.id || Array.isArray(action.payload)) ) {
                let { handle, table } = match.groups;
                if(Array.isArray(action.payload)) {
                    return state.set(table, action.payload.reduce((ntable, row) => {
                        if(row && row.id) {
                            return reducers[handle](ntable, row.id, row);
                        }
                        return ntable;
                    }, state.get(table)));
                }
                const nstate = reducers[handle](state.get(table), action.payload.id, action.payload);
                return state.set(table, nstate);
            }

            return state;
        }
    }
     
}
