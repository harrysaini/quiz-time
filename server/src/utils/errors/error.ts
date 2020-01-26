import _ from 'lodash';
import {ValidationError} from '@hapi/joi';

export enum ERROR_TYPES {
  INVALID_REQUEST,
  COMPUTATION
}

interface ICustomError {
  message: string;
  type: ERROR_TYPES;
  getResponseMessage: () => string;
  getLogMessage: () => string;
}


interface IClientRequestValiadationError extends ICustomError {
  error: ValidationError;
}

export class ClientRequestValidationError extends Error implements IClientRequestValiadationError {
  error: ValidationError;
  type: ERROR_TYPES = ERROR_TYPES.INVALID_REQUEST;

  constructor(error: ValidationError) {
    super();
    this.message =  error.message;
    this.error = error;
  }


  getResponseMessage() {
    return this.message;
  }

  getLogMessage() {
    return (
      `Client request validation error :
        error: ${this.error}
      `
    )
  }
}
