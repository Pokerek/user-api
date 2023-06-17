import { Sequelize } from 'sequelize';

export default class SequelizeConnection {
    private static sequelize: Sequelize;

    private static init = () => {
        const database = {
            host: process.env.DB_HOST,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            port: Number(process.env.DB_PORT),
            name: process.env.DB_NAME
        };

        const { host, username, password, port, name } = database;

        this.sequelize = new Sequelize(
            `mysql://${username}:${password}@${host}:${port}/${name}`
        );
    };

    static instance = () => {
        if (!SequelizeConnection.sequelize) {
            SequelizeConnection.init();
        }
        return SequelizeConnection.sequelize;
    };
}
