import HttpException from './http-error';

export default class UserNotFound extends HttpException {
    constructor(id: number) {
        super(404, `User with ${id} not found`);
    }
}
