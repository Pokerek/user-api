import { NextFunction, Request, Response } from 'express';
import crypto from 'crypto';

import JwtService from '../services/jwt-service';
import MissingAuthorizationHeader from '../errors/missing-authorization-header-error';
import InvalidAuthorizationType from '../errors/invalid-authorization-type-error';

export default class JwtMiddleware {
    static verify = (req: Request, res: Response, next: NextFunction) => {
        try {
            const authorizationHeader = req.headers.authorization;
            if (!authorizationHeader) {
                throw new MissingAuthorizationHeader();
            }

            const [authorizationType, authorizationToken] =
                authorizationHeader.split(' ');
            if (authorizationType.toLowerCase() !== 'bearer') {
                throw new InvalidAuthorizationType();
            }

            JwtService.verify(authorizationToken);
            next();
        } catch (error) {
            next(error);
        }
    };

    static sign = (req: Request, res: Response, next: NextFunction) => {
        try {
            const payload = crypto.randomBytes(16).toString('hex');
            const token = JwtService.sign(payload);
            res.json({ token });
        } catch (error) {
            next(error);
        }
    };
}
