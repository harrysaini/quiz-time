import { IQuestion } from '../models/question.model'
import DAO from '../factories/dao'
import QueryExecutor from '../utils/database/queryExecutor'

class QuestionDAO extends DAO {
  constructor(tableName: string) {
    super(tableName)
  }

  async create(questionObj: IQuestion) {
    const fields = [`id`, `text`, `topicId`, `images`];
    const values = [
      questionObj.id,
      questionObj.text,
      questionObj.topicId,
      questionObj.images,
    ];
    await this.insert(fields, values);
  }

  async getQuestionsForTopic(topicId: string, limit: number) {
    const query = `SELECT * FROM \`${this.tableName}\` WHERE \`topicId\` = ? ORDER BY RAND() LIMIT ${limit};`;
    const { results } = await QueryExecutor.preparedQuery(query, [topicId]);
    console.log(results);
    return results.length ? results : null;
  }
}

export default QuestionDAO
