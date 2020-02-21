import { IAnswer } from '../models/answer.model'
import DAO from '../factories/dao'
import QueryExecutor from '../utils/database/queryExecutor'
import DATABASE from '../constants/database.constants'
import QueryTransaction from '../utils/database/queryTransactions';

const tableName = DATABASE.TABLE_NAME.GAME_QUESTIONS;

export interface IGameQuestions {
  questionId: string;
  gameId: string;
  id: number;
}

class GameQuestionsDAO extends DAO {

  static async create(questionId: string, gameId: string, transaction?: QueryTransaction) {
    const fields = [`questionId`, `gameId`];
    const values = [
      questionId,
      gameId
    ];
    await DAO.insert(tableName, fields, values, transaction);
  }

}

export default GameQuestionsDAO;
