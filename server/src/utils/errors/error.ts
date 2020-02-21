export enum ERROR_TYPES {
  INVALID_REQUEST_VALIDATION,
  INVALID_REQUEST,
  COMPUTATION,
  INVALID_CREDENTIALS,
  INVALID_USAGE
}

export interface ICustomError {
  message: string;
  type: ERROR_TYPES;
  getResponseMessage: () => string;
  getLogMessage: () => string;
}
