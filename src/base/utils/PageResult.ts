export class PageResult<T> {
    private _count: number;
    private _items: T[];

    constructor(count: number, items: T[]) {
        this._count = count;
        this._items = items;
    }

    public get count(): number {
        return this._count;
    }

    public set count(p: number) {
        this._count = p;
    }

    public get items(): T[] {
        return this._items;
    }

    public set items(p: T[]) {
        this._items = p;
    }
}
