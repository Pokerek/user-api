import UserModel from '../models/user';

export default class UserService {
    getUsers = async (): Promise<UserModel[]> => {
        return await UserModel.findAll({});
    };

    getUserById = async (id: number): Promise<UserModel | null> => {
        return await UserModel.findByPk(id);
    };

    createUser = async (user: UserModel): Promise<void> => {
        const foundUser = await UserModel.findOne({
            where: {
                email: user.email
            }
        });
        if (foundUser) {
            //TODO throw error
            throw new Error('User already exists');
        }

        await UserModel.create({
            firstName: user.firstName || null,
            lastName: user.lastName || null,
            email: user.email,
            role: user.role
        });
    };

    updateUser = async (id: number, user: UserModel): Promise<void> => {
        const foundUser = await UserModel.findByPk(id);

        if (!foundUser) {
            //TODO throw error
            throw new Error('User not found');
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
            //TODO throw error
            throw new Error('User not found');
        }

        await UserModel.destroy({
            where: {
                id: id
            }
        });
    };
}
