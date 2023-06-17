import { StatusCodes } from 'http-status-codes';

import HttpError from './http-error';

export default class JwtVerificationFailed extends HttpError {
    constructor() {
        super(StatusCodes.UNAUTHORIZED, 'JWT verification failed');
    }
}
