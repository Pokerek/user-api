import jwt from 'jsonwebtoken';
import MissingJwtSecret from '../errors/missing-jwt-secret-error';
import JwtVerificationFailed from '../errors/jwt-verification-failed-error';

export default class JwtService {
    static get secretKey(): string {
        const secretKey = process.env.JWT_SECRET_KEY;
        if (!secretKey) {
            throw new MissingJwtSecret();
        }

        return secretKey;
    }

    static sign = (payload: string): string => {
        return jwt.sign(payload, JwtService.secretKey);
    };

    static verify = (token: string) => {
        try {
            return jwt.verify(token, JwtService.secretKey);
        } catch (error) {
            throw new JwtVerificationFailed();
        }
    };
}
