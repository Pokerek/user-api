import { DataTypes, Model } from 'sequelize';

import SequelizeConnection from '../services/sequalize-connection';

import { UserRole } from '../generic/constants';

export default class UserModel extends Model {
    declare id: number;
    declare firstName: string;
    declare lastName: string;
    declare email: string;
    declare role: string;
}

const NAME_MAX_LENGTH = 32;
const EMAIL_MAX_LENGTH = 64;

UserModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING(NAME_MAX_LENGTH)
        },
        lastName: {
            type: DataTypes.STRING(NAME_MAX_LENGTH)
        },
        email: {
            type: DataTypes.STRING(EMAIL_MAX_LENGTH),
            allowNull: false,
            unique: true
        },
        role: {
            type: DataTypes.ENUM(...Object.values(UserRole)),
            allowNull: false
        }
    },
    {
        modelName: 'user',
        timestamps: false,
        sequelize: SequelizeConnection.instance()
    }
);
