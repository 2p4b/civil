import { Record, OrderedMap, List, isImmutable } from 'immutable';

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

    class Table extends Record(schema) {

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
                raw = data.toJS();
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

