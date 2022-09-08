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
            req.body.user = decoded;
            next();
        } else {
            return res.status(403).json({
                status: 'failure',
                message: 'Authentication failed!Please pass valid token.'
            })
        }
    } catch (err) {
        res.status(401).json({
            status: 'failure',
            message: 'Invalid Token!'
        })
    }
}

const validateSeller = (req, res, next) => {
    try {
        const { user } = req && req.body;
        const { userId } = user;
        if (/^SLR\W/.test(userId)) {
            next();
        } else {
            res.status(401).json({
                status: 'failure',
                message: 'Access denied!'
            })
        }
    } catch (err) {
        res.status(401).json({
            status: 'failure',
            message: 'Access denied!'
        })
    }
}

const validateBuyer = (req, res, next) => {
    try {
        const { user } = req && req.body;
        const { userId } = user;
        if (/^BYR\W/.test(userId)) {
            next();
        } else {
            res.status(401).json({
                status: 'failure',
                message: 'Access denied!'
            })
        }
    } catch (err) {
        res.status(401).json({
            status: 'failure',
            message: 'Access denied!'
        })
    }
}

module.exports = {
    validateToken,
    validateSeller,
    validateBuyer
}