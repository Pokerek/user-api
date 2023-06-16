import express from 'express';
import { NUMBER } from 'sequelize';
import cors from 'cors';

const PORT = Number(process.env.PORT) || 3000;

class Application {
    private app: express.Application;

    constructor() {
        this.app = express();
        this.initMiddleware();
        this.initRoutes();
    }

    start() {
        this.app.listen(PORT, () => {
            console.log(`API is running on port ${PORT}`);
        });
    }

    private initRoutes() {
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