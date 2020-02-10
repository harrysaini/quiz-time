import _ from 'lodash'
import QuestionDAO from '../dao/question.dao'
import DATABASE from '../constants/database.constants'
import Model from '../factories/model'
import extend from 'lodash/extend'

export interface IQuestion {
  id: string
  topicId: string
  text: string
  images: string | null
}

const questionDAO = new QuestionDAO(DATABASE.TABLE_NAME.QUESTIONS)

class Question implements IQuestion {
  id: string;
  topicId: string;
  text: string;
  images: string | null = null;

  constructor(questionObj: IQuestion) {
    const { id, topicId, text, images } = questionObj
    this.id = id
    this.topicId = topicId
    this.text = text
    this.images = images || null;
  }

  toJSON() {
    return _.pick(this, ['id', 'topicId', 'text', 'images'])
  }

  async save() {
    await questionDAO.create(this)
    return this
  }
}

export default extend(Question, Model<Question>(questionDAO, Question));
