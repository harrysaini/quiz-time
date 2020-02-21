import path from 'path';
import uuid from 'uuid/v4';
import FSUtils from "../utils/fsUtils";
import { Question, Topic, Answer } from '../models';
import CorrectAnswerDAO from '../dao/correctAnswer.dao';
import map from 'lodash/map';

const readQuestionsFile = async () => {
  const topics = await FSUtils.readFile(path.join(__dirname, '../../config/topics.json'));
  return JSON.parse(topics);
}

const createTopic = async (topic: any) => {
  const { name, description, image, questions } = topic;
  const topicObj = new Topic({ name, description, image, id: uuid() });
  await topicObj.save();
  await Promise.all(questions.map(async (question: any) => {
    const { text, answers, correctIndex } = question;
    const questionObj = new Question({ text, id: uuid(), topicId: topicObj.id });
    await questionObj.save();
    let correctAnswerId: string = '';

    await Promise.all(answers.map(async (answer: string, index: number) => {
      const answerObj = new Answer({
        id: uuid(),
        text: answer,
        questionId: questionObj.id,
        index
      });
      if (correctIndex === index) {
        correctAnswerId = answerObj.id;
      }
      await answerObj.save();
    }));

    await CorrectAnswerDAO.create(questionObj.id, correctAnswerId);
  }));
}

const addQuestionsToDB = async () => {
  const topics = await readQuestionsFile();
  await Promise.all(map(topics, (topic: any) => {
    return createTopic(topic);
  }));
}

export default addQuestionsToDB;
