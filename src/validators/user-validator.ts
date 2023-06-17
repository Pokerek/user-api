import Joi from 'joi';

import { User, UserUpdate } from '../models/user';
import HttpError from '../errors/http-error';
import { StatusCodes } from 'http-status-codes';
import { UserRole } from '../generic/constants';

const newUserSchema = Joi.object({
    firstName: Joi.string().default(''),
    lastName: Joi.string().default(''),
    email: Joi.string().email().required(),
    role: Joi.string()
        .valid(...Object.values(UserRole))
        .required()
});

const updateUserSchema = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    role: Joi.string().valid(...Object.values(UserRole))
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
        if (
            typeof user !== 'object' ||
            user === null ||
            Object.keys(user).length === 0
        ) {
            throw new HttpError(
                StatusCodes.BAD_REQUEST,
                `Body needs to be an object with at least one property [${Object.keys(
                    updateUserSchema.describe().keys
                )}]`
            );
        }

        const { error, value } = updateUserSchema.validate(user, {
            abortEarly: false
        });

        if (error) {
            throw new HttpError(StatusCodes.BAD_REQUEST, error.message);
        }

        return value as UserUpdate;
    };
}
