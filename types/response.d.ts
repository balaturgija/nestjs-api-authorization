type Type = 'resource' | 'collection' | 'error';

interface ResponseData<T> {
    status: number;
    method: string;
    path: string;
    type: Type;
    message: string;
    data: T | null;
}

interface ResponseError {
    [key: string]: Record<string, string>;
}
