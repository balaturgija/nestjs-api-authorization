import { ActionResult } from './ActionResult';

export class CreateActionResult<T> extends ActionResult {
    private _data: T[];

    public get data(): T[] {
        return this._data;
    }

    public set data(v: T[]) {
        this._data = v;
    }
}
