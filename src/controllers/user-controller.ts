import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import UserService from '../services/user-service';
import UserModel from '../models/user';

export default class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    getUsers = async (req: Request, res: Response): Promise<void> => {
        const users = await this.userService.getUsers();

        res.status(StatusCodes.OK).send(users);
    };

    getUserById = async (req: Request, res: Response): Promise<void> => {
        const id = Number(req.params.id);

        const user = await this.userService.getUserById(id);

        res.status(StatusCodes.OK).send(user);
    };

    createUser = async (req: Request, res: Response): Promise<void> => {
        const user = req.body as UserModel;

        await this.userService.createUser(user);

        res.status(StatusCodes.CREATED).send();
    };

    updateUser = async (req: Request, res: Response): Promise<void> => {
        const id = Number(req.params.id);
        const user = req.body as UserModel;

        await this.userService.updateUser(id, user);

        res.status(StatusCodes.OK).send();
    };

    deleteUser = async (req: Request, res: Response): Promise<void> => {
        const id = Number(req.params.id);

        await this.userService.deleteUser(id);

        res.status(StatusCodes.OK).send();
    };
}
