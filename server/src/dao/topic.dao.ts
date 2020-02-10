import DAO from '../factories/dao'
import QueryExecutor from '../utils/database/queryExecutor'
import { ITopic } from '../models/topic.model';

class TopicDAO extends DAO {

  constructor(tableName: string) {
    super(tableName);
  }

  async create(topicObj: ITopic) {
    try {
      const query = `INSERT INTO \`${this.tableName}\` (\`id\`, \`name\`, \`description\`, \`image\`) VALUES( ?, ?, ?, ?)`;
      await QueryExecutor.preparedQuery(query, [topicObj.id, topicObj.name, topicObj.description, topicObj.image]);
    } catch (err) {
      // if (err.code === DATABASE.ERRORS.DUPLICATE_ENTRY) {
      //   throw new InvalidRequestError(MESSAGES.USER.USER_ALREADY_EXIST);
      // }
      throw err;
    }
  }
}

export default TopicDAO;
