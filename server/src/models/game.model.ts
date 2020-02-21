import _ from 'lodash';
import DATABASE from '../constants/database.constants';
import Model from '../factories/model';
import extend from 'lodash/extend';
import config from 'config'
import GameDAO from '../dao/game.dao';
import QueryTransaction from '../utils/database/queryTransactions';


export interface IGame {
  id: string;
  player1: string;
  player2?: string | null;
  topicId: string;
  isMultiplayer: boolean;
  num_questions: number;
  player1_played?: boolean;
  player2_played?: boolean;
}

const gameDAO = new GameDAO(DATABASE.TABLE_NAME.GAME)

class Game implements IGame {
  id: string;
  player1: string;
  player2: string | null = null;
  topicId: string;
  isMultiplayer: boolean;
  num_questions: number;
  player1_played: boolean = false;
  player2_played: boolean = false;

  constructor(obj: IGame) {
    const { id, player1, player2, topicId, isMultiplayer, num_questions} = obj;
    this.id = id
    this.player1 = player1;
    this.player2 = player2 || null;
    this.topicId = topicId;
    this.isMultiplayer = isMultiplayer;
    this.num_questions = num_questions;
  }

  toJSON() {
    return _.pick(this, ['id', 'topicId', 'text', 'images'])
  }

  async save(transaction?: QueryTransaction) {
    await gameDAO.create(this, transaction);
    return this
  }
}

export default extend(Game, Model<Game>(gameDAO, Game))
