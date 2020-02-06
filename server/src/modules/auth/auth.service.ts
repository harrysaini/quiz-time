import uuid from 'uuid/v5';
import { hash, genSalt, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import config from 'config';

import { ISignupRequest, IGetUserRequest, ILoginRequest } from "./auth.types";
import User  from "../../models/user.model";
import { InvalidCredentials } from "../../utils/errors/requestValidationErrors";

enum LOGIN_FIELDS{
  USERNAME = 'username',
  PASSWORD = 'password'
}

const JWT_SECRET = config.get('jwt.secret') as string;
const TOKEN_EXPIRY_TIME = config.get('jwt.expiresIn') as string;

class AuthService {
  static async signup(options: ISignupRequest) {
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
    await user.save();
    return user;
  }

  static async getUser(options: IGetUserRequest) {
    const user = await User.findById(options.userId);
    return user;
  }

  static async login(options: ILoginRequest){
    const user = await User.findByUsername(options.username);
    if(!user) {
      throw new InvalidCredentials(LOGIN_FIELDS.USERNAME, options);
    }
    // Compare password hash
    if(!await compare(options.password, user.password)) {
      throw new InvalidCredentials(LOGIN_FIELDS.PASSWORD, options);
    }

    const userToken = sign({id: user.id, username: user.username}, JWT_SECRET, {expiresIn: TOKEN_EXPIRY_TIME});

    return {
      user,
      token: userToken
    }

  }
}


export default AuthService;
