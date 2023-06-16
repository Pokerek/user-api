import { Router } from 'express';

import UserController from '../controllers/user-controller';

export default class UserRoute {
    router = Router();
    private userController = new UserController();

    constructor() {
        this.initRoutes();
    }

    private initRoutes = (): void => {
        this.router.get('/users', this.userController.getUsers);
        this.router.get('/user/:id', this.userController.getUserById);
        this.router.post('/user', this.userController.createUser);
        this.router.put('/user/:id', this.userController.updateUser);
        this.router.delete('/user/:id', this.userController.deleteUser);
    };
}
