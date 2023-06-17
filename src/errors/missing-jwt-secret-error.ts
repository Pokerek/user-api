export default class MissingJwtSecret extends Error {
    constructor() {
        super('Missing JWT secret key');
    }
}
