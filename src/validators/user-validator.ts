import Joi from 'joi';

import { User, UserUpdate } from '../models/user';
import HttpError from '../errors/http-error';
import { StatusCodes } from 'http-status-codes';

const newUserSchema = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email().required(),
    role: Joi.string().valid('admin', 'user').required()
});

const updateUserSchema = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email(),
    role: Joi.string().valid('admin', 'user')
});

export default class UserValidator {
    static createUser = (user: unknown) => {
        const { error, value } = newUserSchema.validate(user, {
            abortEarly: false
        });
        if (error) {
            throw new HttpError(StatusCodes.BAD_REQUEST, error.message);
        }

        return value as User;
    };

    static updateUser = (user: unknown) => {
        const { error, value } = updateUserSchema.validate(user, {
            abortEarly: false
        });

        if (error) {
            throw new HttpError(StatusCodes.BAD_REQUEST, error.message);
        }

        return value as UserUpdate;
    };
}
