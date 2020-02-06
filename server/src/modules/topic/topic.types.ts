
// import { Request } from 'express';
// import { createTopicSchema } from './topic.schema';
// import Validator from '../../utils/validator';

// export interface ICreateTopicRequest {
//   name: string;
//   description: string;
//   image: string;
// }

// export class CreateTopicRequest implements ICreateTopicRequest {
//   name: string;
//   description: string;
//   image: string;

//   validateRequestData(requestData: any) {
//     const values = Validator.validate(requestData, createTopicSchema);
//     return values;
//   }

//   constructor(req: Request) {
//     const values = this.validateRequestData(req.body);
//     const { name, description, image } = values;
//     this.name = name;
//     this.description = description;
//     this.image = image;
//   }
// }
