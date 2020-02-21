import { Request, Response } from 'express';
import { GenericResponse } from '../../utils/genericResponse';
import { RESPONSE_STATUS, HTTP_STATUS } from '../../utils/status';
import { IStartNewGameRequest } from './game.types';
import GameService from './game.service';





class Controller {

  static async startNewGame(req: Request, res: Response) {
    try {
      const options = new IStartNewGameRequest(req);
      const user = await GameService.startNewGame(options);
      const response = new GenericResponse(RESPONSE_STATUS.SUCCESS, 'Success', user);
      res.json(response);
    } catch (err) {
      console.log(err.stack);
      const response = new GenericResponse(RESPONSE_STATUS.FAILED, err.message, null, err);
      res.status(HTTP_STATUS.BAD_REQUEST).send(response);
    }
  }

}


export default Controller;
