import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import UserService from '../services/user-service';
import UserModel from '../models/user';

export default class UserController {
    private userService = new UserService();

    getUsers = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const users = await this.userService.getUsers();

            res.status(StatusCodes.OK).send(users);
        } catch (error) {
            next(error);
        }
    };

    getUserById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const id = Number(req.params.id);

        try {
            const user = await this.userService.getUserById(id);

            if (!user) {
                res.status(StatusCodes.NOT_FOUND).send();
                return;
            }

            res.status(StatusCodes.OK).send(user);
        } catch (error) {
            next(error);
        }
    };

    createUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const user = req.body as UserModel;

        try {
            await this.userService.createUser(user);

            res.status(StatusCodes.CREATED).send();
        } catch (error) {
            next(error);
        }
    };

    updateUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const id = Number(req.params.id);
        const user = req.body as UserModel;

        try {
            await this.userService.updateUser(id, user);

            res.status(StatusCodes.OK).send();
        } catch (error) {
            next(error);
        }
    };

    deleteUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const id = Number(req.params.id);

        try {
            await this.userService.deleteUser(id);

            res.status(StatusCodes.OK).send();
        } catch (error) {
            next(error);
        }
    };
}
