import UserModel, { User, UserUpdate } from '../models/user';

import UserAlreadyExist from '../errors/user-already-exist-error';
import UserNotFound from '../errors/user-not-found-error';
import { UserRole } from '../generic/constants';

export default class UserService {
    getUsers = async (role: string | undefined): Promise<UserModel[]> => {
        const roles: Array<string> = Object.values(UserRole);

        if (role && roles.includes(role)) {
            return await UserModel.findAll({ where: { role } });
        }

        return await UserModel.findAll();
    };

    getUserById = async (id: number): Promise<UserModel | null> => {
        const user = await UserModel.findByPk(id);
        if (!user) {
            throw new UserNotFound(id);
        }

        return user;
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
            firstName: user.firstName,
            lastName: user.lastName,
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
