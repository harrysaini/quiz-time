import { ObjectSchema } from '@hapi/joi';
import { ClientRequestValidationError } from './errors/error';

export default class Validator {
  static validate(obj: any, schema: ObjectSchema<any>) {
    const {value, error} = schema.validate(obj);
    if(error) {
      throw new ClientRequestValidationError(error);
    }
    return value;
  }
}
