import uuid from 'uuid/v4';
import config from 'config';
import { IStartNewGameRequest } from './game.types';
import { Topic, Question, Game } from '../../models';
import { InvalidRequestError } from '../../utils/errors/requestValidationErrors';
import MESSAGES from '../../constants/messages.constants';
import QuestionsService from '../../modules/questions/question.service';
import { IQuestion } from '../../models/question.model';
import GameQuestionsDAO from '../../dao/gameQuestions.dao';
import map from 'lodash/map';
import QueryTransaction from '../../utils/database/queryTransactions';

const NUM_OF_QUESTIONS = config.get('game.numOfQuestions') as number;


class GameService {

  static async saveQuestionsInGame(gameId: string, questions: IQuestion[], gameCreateTransaction: QueryTransaction) {
    return Promise.all(map(questions, (question) => {
      GameQuestionsDAO.create(question.id, gameId, gameCreateTransaction);
    }));
  }

  static async startNewGame(options: IStartNewGameRequest) {
    const topic  = await Topic.findById(options.topicId);
    if(!topic) {
      throw new InvalidRequestError(MESSAGES.GAME.INVALID_TOPIC);
    }
    const game = new Game({
      id: uuid(),
      player1: options.userId,
      topicId: topic.id,
      isMultiplayer: options.isMultiplayer,
      num_questions: NUM_OF_QUESTIONS
    });

    const gameCreateTransaction = new QueryTransaction('gameCreate');
    try {
      await gameCreateTransaction.init();

      await game.save(gameCreateTransaction);
      const questions = await Question.getQuestionsForTopic(topic.id, NUM_OF_QUESTIONS);
      const questionsWithOptions = await QuestionsService.addOptionsToQuestions(questions);

      this.saveQuestionsInGame(game.id, questions, gameCreateTransaction);

      await gameCreateTransaction.commit();
      return {
        ...game,
        questions: questionsWithOptions
      }
    } catch (e) {
      //

      await gameCreateTransaction.rollback();
      throw e;
    }





  }

}


export default GameService;
