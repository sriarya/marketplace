const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = process.env;

const validateToken = (req, res, next) => {
    try {
        const { authorization } = req && req.headers;
        if (authorization) {
            const token = authorization.split(/\s+/).pop() || ''
            if (!token) {
                return res.status(403).json({
                    status: 'failure',
                    message: 'Authentication failed!Please pass valid token.'
                })
            }
            const decoded = jwt.verify(token, TOKEN_SECRET);
            req.user = decoded;
            next();
        }
    } catch (err) {
        res.status(401).json({
            status: 'failure',
            message: 'Invalid Token!'
        })
    }
}

module.exports = {
    validateToken
}