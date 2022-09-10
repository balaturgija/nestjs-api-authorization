export class ActionResult {
  private propertyErorrs: string[];

  constructor() {
    this.propertyErorrs = [];
  }

  public get erorrs(): string[] {
    return this.propertyErorrs;
  }

  public get success(): boolean {
    return this.propertyErorrs.length === 0;
  }

  public AddError = (value: string) => {
    this.propertyErorrs.push(value);
  };

  public AddErrors = (values: string[]) => {
    this.propertyErorrs.push(...values);
  };
}
