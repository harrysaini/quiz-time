
import { Request } from 'express';
import { userSignupSchema, userLoginSchema } from './auth.schema';
import Validator from '../../utils/validator';

export interface ISignupRequest {
  name: string;
  username: string;
  password: string;
}

export class SignupRequest implements ISignupRequest {
  username: string;
  password: string;
  name: string;

  validateRequestData(requestData: any) {
    const values = Validator.validate(requestData, userSignupSchema);
    return values;
  }

  constructor(req: Request) {
    const values = this.validateRequestData(req.body);
    const { username, password, name } = values;
    this.username = username;
    this.password = password;
    this.name = name;
  }
}

export interface ILoginRequest {
  username: string;
  password: string;
}

export class LoginRequest implements ILoginRequest {
  username: string;
  password: string;

  validateRequestData(requestData: any) {
    const values = Validator.validate(requestData, userLoginSchema);
    return values;
  }

  constructor(req: Request) {
    const values = this.validateRequestData(req.body);
    const { username, password } = values;
    this.username = username;
    this.password = password;
  }
}



export interface IGetUserRequest{
  userId: string;
}

export class GetUserRequest implements IGetUserRequest {
  userId: string;

  constructor(req: Request) {
    const { userId } = req.params;
    this.userId = userId;
  }
}

