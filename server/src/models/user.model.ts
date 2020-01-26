import _ from "lodash";
import UserDAO from "../dao/user.dao";
import DATABASE from "../constants/database.constants";
import Model from "../factories/model";
import  extend  from 'lodash/extend';

export interface IUser {
  id: string;
  name: string;
  username: string;
  password: string;
  salt: string;
}


const userDAO = new UserDAO(DATABASE.TABLE_NAME.USERS);

class User implements IUser {
  id: string;
  name: string;
  username: string;
  password: string;
  salt: string;


  constructor(userObj: IUser) {
    const {id, name, username, password, salt} = userObj;
    this.id = id;
    this.name = name;
    this.username = username;
    this.password = password;
    this.salt = salt;
  }

  toJSON() {
    return _.pick(this, ['id', 'name', 'username']);
  }

  async save() {
    return userDAO.create(this);
  }
}

export default extend(User, Model<User>(userDAO, User));


