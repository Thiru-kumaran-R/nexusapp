import jwt from 'jsonwebtoken';

export function validateToken(token) {
    try {
        const decodedToken = jwt.decode(token);
        const currentTime = Date.now().valueOf() / 1000;
        return decodedToken && decodedToken.exp > currentTime;
    } catch (error) {
        return false;
    }
}
