export interface IUser {
  id: string;
  name: string;
  username: string;
  password: string;
  salt: string;
}

export class User implements IUser {
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
}
