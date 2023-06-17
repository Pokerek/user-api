import BusinessLogicError from './business-logic-error';

export default class UserAlreadyExist extends BusinessLogicError {
    constructor(email: string) {
        super(`User with ${email} already exists`);
    }
}
