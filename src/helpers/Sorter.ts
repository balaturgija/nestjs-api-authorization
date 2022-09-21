export enum SortDirection {
    Asc = 'asc',
    Desc = 'desc',
}

export class Sorter {
    private _orderBy: string;
    private _direction: SortDirection;

    constructor(orderBy = 'id', direction: SortDirection = SortDirection.Asc) {
        this._orderBy = orderBy;
        this._direction = direction;
    }

    orderBy = () => this._orderBy;

    direction = () => this._direction;
}
