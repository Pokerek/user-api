import { NextFunction, Request, Response } from 'express';
import HttpException from '../errors/http-error';

export default class ErrorMiddleware {
    private static errorHttpHandler = (
        error: HttpException,
        req: Request,
        res: Response
    ) => {
        const code = error.code || 500;
        const message = error.message || 'Something went wrong';

        res.status(code).send(message);
    };

    static errorHandler = (
        error: Error,
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        if (res.headersSent) {
            next(error);
        }

        if (error instanceof HttpException) {
            ErrorMiddleware.errorHttpHandler(error, req, res);
            return;
        }

        console.log('ERROR: ' + error.message);
        next(new HttpException(500, 'Internal server error'));
    };
}
