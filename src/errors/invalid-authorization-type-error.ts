import { StatusCodes } from 'http-status-codes';

import HttpError from './http-error';

export default class InvalidAuthorizationType extends HttpError {
    constructor() {
        super(
            StatusCodes.UNAUTHORIZED,
            'Invalid authorization type. Must be Bearer'
        );
    }
}
