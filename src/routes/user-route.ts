import { Router } from 'express';

import UserController from '../controllers/user-controller';
import JwtMiddleware from '../middlewares/jwt-middleware';

export default class UserRoute {
    router = Router();
    private userController = new UserController();

    constructor() {
        this.initRoutes();
    }

    private initRoutes = (): void => {
        this.router.get(
            '/users',
            JwtMiddleware.verify,
            this.userController.getUsers
        );
        this.router.get(
            '/user/:id',
            JwtMiddleware.verify,
            this.userController.getUserById
        );
        this.router.post(
            '/user',
            JwtMiddleware.verify,
            this.userController.createUser
        );
        this.router.patch(
            '/user/:id',
            JwtMiddleware.verify,
            this.userController.updateUser
        );
        this.router.delete(
            '/user/:id',
            JwtMiddleware.verify,
            this.userController.deleteUser
        );
    };
}
