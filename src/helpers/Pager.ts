export class Pager {
  private propertyPageNumber: number;
  private propertyPageSize: number;

  constructor(pageNumber = 1, pageSize = 10) {
    this.propertyPageNumber = pageNumber;
    this.propertyPageSize = pageSize;
  }

  pageNumber = () => this.propertyPageNumber;

  pageSize = () => this.propertyPageSize;
}
