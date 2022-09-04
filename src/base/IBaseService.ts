export interface IBaseService<T> {
  getAll(): Promise<T[]>;
  get(id: string): Promise<T>;
  create(entity: any): Promise<T>;
  delete(id: string): Promise<boolean>;
}
