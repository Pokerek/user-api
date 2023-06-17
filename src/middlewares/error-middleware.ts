import { NextFunction, Request, Response } from 'express';
import HttpError from '../errors/http-error';
import { StatusCodes } from 'http-status-codes';

export default class ErrorMiddleware {
    private static errorHttpHandler = (
        error: HttpError,
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

        if (error instanceof HttpError) {
            ErrorMiddleware.errorHttpHandler(error, req, res);
            return;
        }

        console.log('ERROR: ' + error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(
            'Internal Server Error'
        );
    };
}
