
import { Request } from 'express';
import { ClientRequestValidationError } from 'src/utils/error';

export interface ISignupRequest {
  name: string;
  username: string;
  password: string;
}

export class SignupRequest implements ISignupRequest {
  username: string;
  password: string;
  name: string;

  validateRequestData() {
    if (!this.username) {
      throw new ClientRequestValidationError('username not present', ['username']);
    }
    if (!this.password) {
      throw new ClientRequestValidationError('password not present', ['password']);
    }
    if (!this.name) {
      throw new ClientRequestValidationError('name not present', ['name']);
    }
  }

  constructor(req: Request) {
    const { username, password, name } = req.body;
    this.username = username;
    this.password = password;
    this.name = name;
    this.validateRequestData();
  }
}

