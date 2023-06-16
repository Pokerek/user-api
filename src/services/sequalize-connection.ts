import { Sequelize } from 'sequelize';

const database = {
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    port: Number(process.env.DB_PORT) || 3306,
    name: process.env.DB_NAME || 'test'
};

export default class SequelizeConnection {
    private static sequelize: Sequelize;

    private static init = () => {
        const { host, username, password, port, name } = database;

        this.sequelize = new Sequelize(
            `mysql://${username}:${password}@${host}:${port}/${name}`
        );

        console.log('Sequelize initialized');
    };

    static instance = () => {
        if (!SequelizeConnection.sequelize) {
            SequelizeConnection.init();
        }
        return SequelizeConnection.sequelize;
    };
}
