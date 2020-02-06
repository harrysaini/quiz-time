import { IAnswer } from '../models/answer.model'
import DAO from '../factories/dao'
import QueryExecutor from '../utils/database/queryExecutor'

class AnswerDAO extends DAO {
  constructor(tableName: string) {
    super(tableName)
  }

  async create(answerObj: IAnswer) {
    const query = `INSERT INTO \`${this.tableName}\` (\`id\`, \`text\`, \`questionId\`, \`index\`) VALUES( ?, ?, ?, ? )`
    await QueryExecutor.preparedQuery(query, [
      answerObj.id,
      answerObj.text,
      answerObj.questionId,
      answerObj.index,
    ])
  }
}

export default AnswerDAO
