import { IAnswer } from '../models/answer.model'
import DAO from '../factories/dao'
import QueryExecutor from '../utils/database/queryExecutor'
import { IGame } from '../models/game.model'
import QueryTransaction from '../utils/database/queryTransactions'

class GameDAO extends DAO {
  constructor(tableName: string) {
    super(tableName)
  }

  async create(gameObj: IGame, transaction?: QueryTransaction) {
    const fields = [`id`, `player1`, `player2`, `topicId`, `isMultiplayer`, `num_questions`];
    const values = [
      gameObj.id,
      gameObj.player1,
      gameObj.player2,
      gameObj.topicId,
      gameObj.isMultiplayer,
      gameObj.num_questions
    ]
    await this.insert(fields, values, transaction);
  }
}


export default GameDAO;
