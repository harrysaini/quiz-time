import { IQuestion } from '../models/question.model'
import DAO from '../factories/dao'
import QueryExecutor from '../utils/database/queryExecutor'

class QuestionDAO extends DAO {
  constructor(tableName: string) {
    super(tableName)
  }

  async create(questionObj: IQuestion) {
    const query = `INSERT INTO \`${this.tableName}\` (\`id\`, \`text\`, \`topicId\`, \`images\`) VALUES( ?, ?, ?, ? )`
    await QueryExecutor.preparedQuery(query, [
      questionObj.id,
      questionObj.text,
      questionObj.topicId,
      questionObj.images,
    ])
  }
}

export default QuestionDAO
