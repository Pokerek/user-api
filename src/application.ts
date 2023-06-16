import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import SequelizeConnection from './services/sequalize-connection';
import UserRoute from './routes/user-route';

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;

class Application {
    private app: express.Application;

    constructor() {
        this.app = express();
        this.initMiddleware();
        this.initRoutes();
        SequelizeConnection.instance().sync();
    }

    start() {
        this.app.listen(PORT, () => {
            console.log(`API is running on port ${PORT}`);
        });
    }

    private initRoutes() {
        const userRoute = new UserRoute();
        this.app.use('/api', userRoute.router);
        this.app.get('/', (req, res) => {
            res.send('Hello World');
        });
    }

    private initMiddleware() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }
}

export default Application;
