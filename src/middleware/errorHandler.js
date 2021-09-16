import { errorResponse } from '../helpers';
import { ValidationError } from 'express-validation';

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  
  if (err instanceof ValidationError) {
    console.log(err)
    let messages = err.details.body.map(e => e.field);
    if (messages.length && messages.length > 1) {
      messages = `${messages.join(', ')} are required fields`;
    } else {
      messages = `${messages.join(', ')} is required field`;
    }
    return errorResponse(req, res, messages, err.statusCode, err);
  }
  return errorResponse(req, res, "App Generic Error", 500, err);
};

export default errorHandler;
