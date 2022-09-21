export class Pager {
    private _pageNumber: number;
    private _pageSize: number;

    constructor(pageNumber = 1, pageSize = 10) {
        this._pageNumber = pageNumber;
        this._pageSize = pageSize;
    }

    pageNumber = () => this._pageNumber;

    pageSize = () => this._pageSize;
}
