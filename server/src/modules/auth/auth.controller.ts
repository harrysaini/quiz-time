import { Request, Response } from 'express';
import { GenericResponse } from '../../utils/genericResponse';
import { RESPONSE_STATUS, HTTP_STATUS } from '../../utils/status';
import { SignupRequest } from './auth.types';
import AuthService from './auth.service';
import UserDAO from '../../dao/user.dao';
import { DATABASE } from '../../constants/index';
import { User } from '../../models/user.model';


const userDAO = new UserDAO(DATABASE.TABLE_NAME.USERS);
const authService = new AuthService(userDAO);


class AuthController {

  static async signup(req: Request, res: Response) {
    try {
      const options = new SignupRequest(req);
      const user: User = await authService.signup(options);
      const response = new GenericResponse<User>(RESPONSE_STATUS.SUCCESS, 'Success', user);
      res.json(response);
    } catch (err) {
      console.log(err);
      const response = new GenericResponse(RESPONSE_STATUS.FAILED, err.message);
      res.status(HTTP_STATUS.BAD_REQUEST).send(response);
    }
  }
}


export default AuthController;
