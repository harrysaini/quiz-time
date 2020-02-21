import { IAnswer } from '../models/answer.model'
import DAO from '../factories/dao'
import QueryExecutor from '../utils/database/queryExecutor'
import DATABASE from '../constants/database.constants'

const tableName = DATABASE.TABLE_NAME.CORRECT_ANSWER;

export interface ICorrectAnswer {
  questionId: string;
  answerId: string;
  id: number;
}

class CorrectAnswerDAO extends DAO {

  static async create(questionId: string, answerId: string) {
    const fields = ['questionId', 'answerId'];
    const values = [
      questionId,
      answerId
    ];
    await DAO.insert(tableName, fields, values);
  }

  static async getCorrectAnswerOfQuestion(questionId: string): Promise<ICorrectAnswer | null> {
    const query = `SELECT * FROM \`${tableName}\` WHERE questionId=?`;
    const { results } = await QueryExecutor.preparedQuery(query, [questionId]);
    return results.length ? results[0] : null;
  }
}

export default CorrectAnswerDAO;
