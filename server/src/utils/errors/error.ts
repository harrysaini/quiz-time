export enum ERROR_TYPES {
  INVALID_REQUEST,
  COMPUTATION,
  INVALID_CREDENTIALS
}

export interface ICustomError {
  message: string;
  type: ERROR_TYPES;
  getResponseMessage: () => string;
  getLogMessage: () => string;
}
