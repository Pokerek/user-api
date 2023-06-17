import { object, string } from 'joi';

import { User, UserUpdate } from '../models/user';

const validateNewUser = object({
    firstName: string(),
    lastName: string(),
    email: string().email().required(),
    role: string().valid('admin', 'user').required()
});

const validateUpdateUser = object({
    firstName: string(),
    lastName: string(),
    email: string().email(),
    role: string().valid('admin', 'user')
});

export default class UserValidator {
    static createUser = async (user: unknown): Promise<User> => {
        return await validateNewUser.validateAsync(user);
    };

    static updateUser = async (user: unknown): Promise<UserUpdate> => {
        return await validateUpdateUser.validateAsync(user);
    };
}
