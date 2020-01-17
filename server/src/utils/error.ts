import _ from 'lodash';

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
  invalidData?: string[];
  missingData?: string[];
  requestData?: any;
}

export class ClientRequestValidationError extends Error implements IClientRequestValiadationError {
  invalidData?: string[];
  missingData?: string[];
  requestData?: any;
  type: ERROR_TYPES = ERROR_TYPES.INVALID_REQUEST;

  constructor(message?: string, invalidData?: string[], missingData?: string[], requestData?: any) {
    super();

    this.message = message || this.generateErrorMessage(invalidData, missingData);
    if (invalidData) {
      this.invalidData = invalidData;
    }
    if (missingData) {
      this.invalidData = missingData;
    }
    if (requestData) {
      this.invalidData = requestData;
    }
  }

  generateErrorMessage(invalidData?: string[], missingData?: string[]): string {
    let msg = '';
    if (invalidData) {
      msg = msg + `Invalid fields: ${invalidData.join(', ')}`;
    }
    if (missingData) {
      msg = msg + `Missing fields: ${missingData.join(', ')}`;
    }

    return msg || 'Invalid request';
  }

  getResponseMessage() {
    return this.message;
  }

  getLogMessage() {
    return (
      `Client request validation error :
        missingFields: ${this.missingData}
        invalidFields: ${this.invalidData}
        requestPayload: ${JSON.stringify(this.requestData)}
      `
    )
  }
}
