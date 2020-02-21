import DAO from '../factories/dao'
import QueryExecutor from '../utils/database/queryExecutor'
import { ITopic } from '../models/topic.model';

class TopicDAO extends DAO {

  constructor(tableName: string) {
    super(tableName);
  }

  async create(topicObj: ITopic) {
    const fields = [`id`, `name`, `description`, `image`];
    const  values = [topicObj.id, topicObj.name, topicObj.description, topicObj.image];
    await this.insert(fields, values);
  }
}

export default TopicDAO;
