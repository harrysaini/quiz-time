
import { Request } from 'express';
import {startNewGameRequestSchema } from './game.schema';
import Validator from '../../utils/validator';

export interface IStartNewGameRequest {
  userId: string;
  topicId: string;
  isMultiplayer: boolean;
}

export class IStartNewGameRequest implements IStartNewGameRequest {
  userId: string;
  topicId: string;
  isMultiplayer: boolean;

  validateRequestData(requestData: any) {
    const values = Validator.validate(requestData, startNewGameRequestSchema);
    return values;
  }

  constructor(req: Request) {
    const values = this.validateRequestData(req.body);
    const { userId, topicId, isMultiplayer } = values;
    this.userId = userId;
    this.topicId = topicId;
    this.isMultiplayer = isMultiplayer;
  }
}



