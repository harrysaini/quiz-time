import { ICustomError, ERROR_TYPES } from './error';


interface IInvalidUsageError extends ICustomError {
  method: string;
  paramName?: string;
  params?: any;
  message: string;
}

export class InvalidUsageError extends Error implements IInvalidUsageError {
  method: string;
  paramName?: string;
  params?: any;
  message: string;
  type: ERROR_TYPES = ERROR_TYPES.INVALID_USAGE;

  constructor(message: string, method: string, paramName?: string, params?: any) {
    super();
    this.message = message;
    this.method = method;
    this.paramName = paramName;
    this.params = params;
  }


  getResponseMessage() {
    return this.message;
  }

  getLogMessage() {
    return (
      `Invalid method invocation error :
        message: ${this.message}
        method: ${this.method}
        param: ${this.paramName}
        params: ${this.params}
      `
    )
  }
}
