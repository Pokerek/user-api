import HttpError from './http-error';
import { StatusCodes } from 'http-status-codes';

export default class ValidationError extends HttpError {
    constructor(message: string) {
        super(StatusCodes.BAD_REQUEST, message);
    }
}
