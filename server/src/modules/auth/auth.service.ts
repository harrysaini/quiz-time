import UserDAO from "../../dao/user.dao";
import { ISignupRequest } from "./auth.types";
import { hash, genSalt, compare } from 'bcrypt';
import { User } from "../../models/user.model";
import uuid from 'uuid/v5';

class AuthService {
  userDAO: UserDAO;

  constructor(userDAO: UserDAO) {
    this.userDAO = userDAO;
  }

  async signup(options: ISignupRequest) {
    const salt  = await genSalt();
    const hashedPassword = await hash(options.password, salt);
    const userObj = {
      id: uuid(options.username, uuid.URL),
      username: options.username,
      name: options.name,
      password: hashedPassword,
      salt
    };
    const user = new User(userObj);
    await this.userDAO.create(user);
    return user;
  }
}


export default AuthService;
