import { Request, Response } from 'express';
import { GenericResponse } from 'src/utils/genericResponse';
import { RESPONSE_STATUS } from 'src/utils/status';
import { SignupRequest } from './auth.types';


const AuthController = {

  signup(req: Request, res: Response) {
    try {
      const options = new SignupRequest(req);
      const user: User = await AuthModel.signup(options);
      const response = new GenericResponse<User>(RESPONSE_STATUS.SUCCESS, 'Success', user);
      res.json(response);
    } catch (err) {
      const response = new GenericResponse(RESPONSE_STATUS.FAILED, err.message);
      res.status(HTTP_STATUS.BAD_REQUEST).send(response);
    }
  }
}


export default AuthController;
