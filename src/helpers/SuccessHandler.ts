import { classToPlain } from 'class-transformer';

export class SuccessHandler {
  status = 'success';
  statusCode: number;
  data?: any;

  constructor(statusCode: number, data?: any, skipFormat = false) {
    this.statusCode = statusCode;
    this.data =
      data &&
      (skipFormat ? data : classToPlain(data, { strategy: 'excludeAll' }));
  }
}
