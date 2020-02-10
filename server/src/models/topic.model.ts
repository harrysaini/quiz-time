import _ from "lodash";
import DATABASE from "../constants/database.constants";
import Model from "../factories/model";
import extend from 'lodash/extend';
import TopicDAO from "../dao/topic.dao";

export interface ITopic {
  id: string;
  name: string;
  description: string;
  image: string;
}


const topicDAO = new TopicDAO(DATABASE.TABLE_NAME.TOPIC);

class Topic implements ITopic {
  id: string;
  name: string;
  description: string;
  image: string;


  constructor(userObj: ITopic) {
    const { id, name, description, image } = userObj;
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
  }


  async save() {
    await topicDAO.create(this);
    return this;
  }


}

export default extend(Topic, Model<Topic>(topicDAO, Topic));


