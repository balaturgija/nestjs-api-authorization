export class PageResult<T> {
  private propertyCount: number;
  private propertyItems: T[];

  constructor(count: number, items: T[]) {
    this.propertyCount = count;
    this.propertyItems = items;
  }

  public get count(): number {
    return this.propertyCount;
  }

  public set count(v: number) {
    this.propertyCount = v;
  }

  public get items(): T[] {
    return this.propertyItems;
  }

  public set items(v: T[]) {
    this.propertyItems = v;
  }
}
