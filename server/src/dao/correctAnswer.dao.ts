import { IAnswer } from '../models/answer.model'
import DAO from '../factories/dao'
import QueryExecutor from '../utils/database/queryExecutor'
import DATABASE from '../constants/database.constants'

class CorrectAnswerDAO extends DAO {
  constructor(tableName: string) {
    super(tableName)
  }

  static async insert(questionId: string, answerId: string) {
    const query = `INSERT INTO \`${DATABASE.TABLE_NAME.CORRECT_ANSWER}\` (\`questionId\`, \`answerId\`) VALUES( ?, ? )`
    await QueryExecutor.preparedQuery(query, [
      questionId,
      answerId
    ]);
  }
}

export default CorrectAnswerDAO;
