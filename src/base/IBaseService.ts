import { ActionResult } from 'src/helpers/ActionResult';
import { CreateActionResult } from 'src/helpers/CreateActionResult';
import { Pager } from 'src/helpers/Pager';
import { PageResult } from 'src/helpers/PageResult';
import { Sorter } from 'src/helpers/Sorter';

export interface IBaseService<T> {
    findAllAsync(
        pager?: Pager,
        sorter?: Sorter,
        whereClause?: object,
        include?: string[]
    ): Promise<PageResult<T>>;
    getAsync(id: string): Promise<T | null>;
    createAsync(entity: T): Promise<CreateActionResult<T>>;
    putAsync(entity: any, id: string): Promise<ActionResult>;
    deleteAsync(id: string): Promise<ActionResult>;
}
