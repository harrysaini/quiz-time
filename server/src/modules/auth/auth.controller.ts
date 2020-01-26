import { Request, Response } from 'express';
import { GenericResponse } from '../../utils/genericResponse';
import { RESPONSE_STATUS, HTTP_STATUS } from '../../utils/status';
import { SignupRequest, GetUserRequest } from './auth.types';
import AuthService from './auth.service';
import UserDAO from '../../dao/user.dao';
import DATABASE from '../../constants/database.constants';
import { User } from '../../models/user.model';




class AuthController {

  static async signup(req: Request, res: Response) {
    try {
      const options = new SignupRequest(req);
      const user: User = await AuthService.signup(options);
      const response = new GenericResponse<User>(RESPONSE_STATUS.SUCCESS, 'Success', user);
      res.json(response);
    } catch (err) {
      console.log(err.stack);
      const response = new GenericResponse(RESPONSE_STATUS.FAILED, err.message, null, err);
      res.status(HTTP_STATUS.BAD_REQUEST).send(response);
    }
  }

  static async getUser(req: Request, res: Response) {
    try {
      const options = new GetUserRequest(req);
      const user: any = await AuthService.getUser(options);
      const response = new GenericResponse<User>(RESPONSE_STATUS.SUCCESS, 'Success', user);
      res.json(response);
    } catch (err) {
      const response = new GenericResponse(RESPONSE_STATUS.FAILED, err.message, null, err);
      res.status(HTTP_STATUS.BAD_REQUEST).send(response);
    }
  }
}


export default AuthController;
