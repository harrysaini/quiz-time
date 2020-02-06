// import { Request, Response } from 'express';
// import { GenericResponse } from '../../utils/genericResponse';
// import { RESPONSE_STATUS, HTTP_STATUS } from '../../utils/status';
// import { SignupRequest, GetUserRequest, LoginRequest } from './topic.types';
// import AuthService from './topic.service';
// import UserDAO from '../../dao/user.dao';
// import DATABASE from '../../constants/database.constants';
// import { IUser } from '../../models/user.model';




// class Topiccontroller {

//   static async create(req: Request, res: Response) {
//     try {
//       const options = new SignupRequest(req);
//       const user: IUser = await AuthService.signup(options);
//       const response = new GenericResponse<IUser>(RESPONSE_STATUS.SUCCESS, 'Success', user);
//       res.json(response);
//     } catch (err) {
//       console.log(err.stack);
//       const response = new GenericResponse(RESPONSE_STATUS.FAILED, err.message, null, err);
//       res.status(HTTP_STATUS.BAD_REQUEST).send(response);
//     }
//   }


// }


// export default AuthController;
