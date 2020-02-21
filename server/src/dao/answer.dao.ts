import { IAnswer } from '../models/answer.model'
import DAO from '../factories/dao'
import QueryExecutor from '../utils/database/queryExecutor'

class AnswerDAO extends DAO {
  constructor(tableName: string) {
    super(tableName)
  }

  async create(answerObj: IAnswer) {
    const fields = ['id', 'text', 'questionId', 'index'];
    const values = [
      answerObj.id,
      answerObj.text,
      answerObj.questionId,
      answerObj.index
    ];
    await this.insert(fields, values);
  }

  async getAnswersForQuestion(questionId: string) {
    const query = `SELECT * FROM \`${this.tableName}\` WHERE questionId=?`;
    const { results } = await QueryExecutor.preparedQuery(query, [questionId]);
    return results.length ? results : null;
  }
}

export default AnswerDAO
