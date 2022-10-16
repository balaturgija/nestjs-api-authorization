export class PageResult<T> {
    private count: number;
    private items: T[];

    constructor(count: number, items: T[]) {
        this.count = count;
        this.items = items;
    }
}
