export enum SortDirection {
    Asc = 'asc',
    Desc = 'desc',
}

export class Sorter {
    private propertyOrderBy: string;
    private propertyDirection: SortDirection;

    constructor(orderBy = 'id', direction: SortDirection = SortDirection.Asc) {
        this.propertyOrderBy = orderBy;
        this.propertyDirection = direction;
    }

    orderBy = () => this.propertyOrderBy;

    direction = () => this.propertyDirection;
}
