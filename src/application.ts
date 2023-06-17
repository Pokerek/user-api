import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import ErrorMiddleware from './middlewares/error-middleware';
import SequelizeConnection from './services/sequelize-connection';
import UserRoute from './routes/user-route';
import JwtMiddleware from './middlewares/jwt-middleware';

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;

class Application {
    private app: express.Application;

    constructor() {
        this.app = express();
        this.initMiddleware();
        SequelizeConnection.instance().sync();
        this.initRoutes();

        this.initErrorHandling();
    }

    start() {
        this.app.listen(PORT, () => {
            console.log(`API is running on port ${PORT}`);
        });
    }

    private initRoutes() {
        const userRoute = new UserRoute();
        this.app.use('/api', userRoute.router);
        this.app.get('/api/key', JwtMiddleware.sign);
    }

    private initMiddleware() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private initErrorHandling() {
        this.app.use(ErrorMiddleware.errorHandler);
    }
}

export default Application;
