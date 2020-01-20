import { IUser, User } from '../models/user.model';
import DAO from '../utils/database/dao';
import QueryExecutor from '../utils/database/queryExecutor';

class UserDAO extends DAO {

  constructor(tableName: string) {
    super(tableName);
  }

  async create(userObj: IUser) {
    const query = `INSERT INTO \`${this.tableName}\` (\`id\`, \`name\`, \`username\`, \`salt\`, \`password\`) VALUES( ?, ?, ?, ?, ? )`;
    const { results, fields } = await QueryExecutor.preparedQuery(query, [userObj.id, userObj.name, userObj.username, userObj.salt, userObj.password]);
    console.log( results, fields);
  }
}

export default UserDAO;
