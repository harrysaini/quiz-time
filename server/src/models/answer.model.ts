import _ from 'lodash'
import AnswerDAO from '../dao/answer.dao'
import DATABASE from '../constants/database.constants'
import Model from '../factories/model'
import extend from 'lodash/extend'
import { IQuestion } from './question.model'
import map from 'lodash/map'

export interface IAnswer {
  id: string
  questionId: string
  text: string
  index: number
}

const answerDAO = new AnswerDAO(DATABASE.TABLE_NAME.ANSWERS)

class Answer implements IAnswer {
  id: string
  questionId: string
  text: string
  index: number

  constructor(answerObj: IAnswer) {
    const { id, questionId, text, index } = answerObj
    this.id = id
    this.questionId = questionId
    this.text = text
    this.index = index
  }


  async save() {
    await answerDAO.create(this)
    return this
  }

  static async getAnswersForQuestion(question: IQuestion): Promise<Answer[]> {
    const answers = await answerDAO.getAnswersForQuestion(question.id);
    return map(answers, answer => new Answer(answer));
  }
}

export default extend(Answer, Model<Answer>(answerDAO, Answer))
