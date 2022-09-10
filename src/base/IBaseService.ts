import { ActionResult } from 'src/helpers/ActionResult';
import { CreateActionResult } from 'src/helpers/CreateActionResult';

export interface IBaseService<T> {
  getAll(): Promise<T[]>;
  get(id: string): Promise<T | null>;
  create(entity: T): Promise<CreateActionResult<T>>;
  put(entity: any, id: string): Promise<ActionResult>;
  delete(id: string): Promise<boolean>;
}
