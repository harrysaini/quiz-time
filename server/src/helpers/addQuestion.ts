import path from 'path';
import uuid from 'uuid/v4';
import Topic from '../models/topic.model';
import FSUtils from "../utils/fsUtils";

const readQuestionsFile = async () => {
  const topics = await FSUtils.readFile(path.join(__dirname, '../../config/topics.json'));
  return JSON.parse(topics);
}

const createTopic = async (topic: any) => {
  const { name, description, image, questions } = topic;
  const topicObj = new Topic({ name, description, image, id: uuid() });
  await topicObj.save();
  questions.forEach((question: any) => {

  });
}

const addQuestionsToDB = async () => {
  const topics = await readQuestionsFile();
  await Promise.all(topics.map(topics, (topic: any) => {
    return createTopic(topic);
  }));
}
