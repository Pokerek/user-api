import { StatusCodes } from 'http-status-codes';

import HttpError from './http-error';

export default class MissingAuthorizationHeader extends HttpError {
    constructor() {
        super(StatusCodes.UNAUTHORIZED, 'Missing authorization header');
    }
}
