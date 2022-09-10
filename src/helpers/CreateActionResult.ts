import { ActionResult } from './ActionResult';

export class CreateActionResult<T> extends ActionResult {
  private propertyData: T[];

  public get data(): T[] {
    return this.propertyData;
  }

  public set data(v: T[]) {
    this.propertyData = v;
  }
}
