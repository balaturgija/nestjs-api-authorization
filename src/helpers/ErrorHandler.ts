export class ErrorHandler {
  staus = 'error';
  statusCode: number;
  message: string;
  data?: string[];

  constructor(statusCode: number, message: string, data?: string[]) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}
