import { StatusCodes } from 'http-status-codes';
import HttpError from './http-error';

export default class BusinessLogicError extends HttpError {
    constructor(message: string) {
        super(StatusCodes.CONFLICT, message);
    }
}
