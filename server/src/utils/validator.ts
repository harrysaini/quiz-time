import { ObjectSchema } from '@hapi/joi';
import { ClientRequestValidationError } from './errors/requestValidationErrors';

export default class Validator {
  static validate(obj: any, schema: ObjectSchema<any>) {
    const {value, error} = schema.validate(obj);
    console.log('VALIDATOR', value, error);
    if(error) {
      throw new ClientRequestValidationError(error);
    }
    return value;
  }
}
