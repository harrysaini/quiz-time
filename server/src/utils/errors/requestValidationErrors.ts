import _ from 'lodash';
import {ValidationError} from '@hapi/joi';
import { ICustomError, ERROR_TYPES } from './error';
import MESSAGES from '../../constants/messages.constants';


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

interface IInvalidCredentials extends ICustomError {
  invalidField: string;
  requestData?: any;
}

export class InvalidCredentials extends Error implements IInvalidCredentials {
  invalidField: string;
  requestData?: any;
  type: ERROR_TYPES = ERROR_TYPES.INVALID_CREDENTIALS;

  constructor(invalidField: string, requestData?: any) {
    super();
    this.invalidField = invalidField;
    this.message =  MESSAGES.INVALID_LOGIN_REQUEST;
    this.requestData = requestData;
  }


  getResponseMessage() {
    return this.message;
  }

  getLogMessage() {
    return (
      `Invalid login request:
        invalidField: ${this.invalidField}
        requestData: ${this.requestData}
      `
    )
  }
}
