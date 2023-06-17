import UserModel, { User, UserUpdate } from '../models/user';

import UserAlreadyExist from '../errors/user-already-exist-error';
import UserNotFound from '../errors/user-not-found-error';

export default class UserService {
    getUsers = async (): Promise<UserModel[]> => {
        return await UserModel.findAll();
    };

    getUserById = async (id: number): Promise<UserModel | null> => {
        return await UserModel.findByPk(id);
    };

    createUser = async (user: User): Promise<void> => {
        const foundUser = await UserModel.findOne({
            where: {
                email: user.email
            }
        });
        if (foundUser) {
            throw new UserAlreadyExist(user.email);
        }

        await UserModel.create({
            firstName: user.firstName || null,
            lastName: user.lastName || null,
            email: user.email,
            role: user.role
        });
    };

    updateUser = async (id: number, user: UserUpdate): Promise<void> => {
        const foundUser = await UserModel.findByPk(id);

        if (!foundUser) {
            throw new UserNotFound(id);
        }

        await UserModel.update(user, {
            where: {
                id: id
            }
        });
    };

    deleteUser = async (id: number): Promise<void> => {
        const foundUser = await UserModel.findByPk(id);

        if (!foundUser) {
            throw new UserNotFound(id);
        }

        await UserModel.destroy({
            where: {
                id: id
            }
        });
    };
}
