import path from 'path';
import uuid from 'uuid/v4';
import Topic from '../models/topic.model';
import FSUtils from "../utils/fsUtils";

const readQuestionsFile = async () => {
  const topics = await FSUtils.readFile(path.join(__dirname, '../../config/topics.json'));
  return JSON.parse(topics);
}

const createTopic = async (topic: any) => {
  const { name, description, image } = topic;
  const topicObj = new Topic({ name, description, image, id: uuid() });
}

const addQuestionsToDB = async () => {
  const topics = await readQuestionsFile();
  topics.map(topics, (topic: any) => {
    return createTopic(topic);
  })
}
