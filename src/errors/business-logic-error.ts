import HttpException from './http-error';

export default class BusinessLogicError extends HttpException {
    constructor(message: string) {
        super(409, message);
    }
}
