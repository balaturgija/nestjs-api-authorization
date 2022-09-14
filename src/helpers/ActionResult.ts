export class ActionResult {
  private propertyErrors: string[];

  constructor() {
    this.propertyErrors = [];
  }

  public get errors(): string[] {
    return this.propertyErrors;
  }

  public get success(): boolean {
    return this.propertyErrors.length === 0;
  }

  public AddError = (value: string) => {
    this.propertyErrors.push(value);
  };

  public AddErrors = (values: string[]) => {
    this.propertyErrors.push(...values);
  };
}
