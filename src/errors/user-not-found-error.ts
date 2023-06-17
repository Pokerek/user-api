import { StatusCodes } from 'http-status-codes';
import HttpError from './http-error';

export default class UserNotFound extends HttpError {
    constructor(id: number) {
        super(StatusCodes.NOT_FOUND, `User with ${id} not found`);
    }
}
