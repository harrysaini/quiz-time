import _ from 'lodash'
import QuestionDAO from '../dao/question.dao'
import DATABASE from '../constants/database.constants'
import Model from '../factories/model'
import extend from 'lodash/extend'
import map from 'lodash/map';

export interface IQuestion {
  id: string
  topicId: string
  text: string
  images?: string | null
}

const questionDAO = new QuestionDAO(DATABASE.TABLE_NAME.QUESTIONS)

class Question implements IQuestion {
  id: string;
  topicId: string;
  text: string;
  images?: string | null = null;

  constructor(questionObj: IQuestion) {
    const { id, topicId, text, images } = questionObj
    this.id = id
    this.topicId = topicId
    this.text = text
    this.images = images || null;
  }


  async save(): Promise<Question> {
    await questionDAO.create(this)
    return this
  }

  static async getQuestionsForTopic(topicId: string, limit: number): Promise<Question[]> {
    const questions = await questionDAO.getQuestionsForTopic(topicId, limit);
    return map(questions, question => new Question(question));
  }
}

export default extend(Question, Model<Question>(questionDAO, Question));
