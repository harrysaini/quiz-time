import config from 'config';
import { Topic, Question, Answer } from '../../models';
import { IQuestion } from '../../models/question.model';
import map from 'lodash/map';
import CorrectAnswerDAO from '../../dao/correctAnswer.dao';
import extend from 'lodash/extend';



class QuestionsService {

  static async addOptionsToQuestions(questions: IQuestion[]) {
    return await Promise.all(map(questions, async (question) => {
      const [answers, correctAnswerObj] = await Promise.all([
        Answer.getAnswersForQuestion(question),
        CorrectAnswerDAO.getCorrectAnswerOfQuestion(question.id)
      ]);
      const correctAnswer = correctAnswerObj && correctAnswerObj.answerId;
      return extend(question, {
        answers,
        correctAnswer
      });
    }));
  }

}


export default QuestionsService;
