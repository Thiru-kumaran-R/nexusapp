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

export function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
            if (err) return reject(err);
            resolve(decoded);
        });
    });
}