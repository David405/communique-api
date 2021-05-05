const jwt = require('jsonwebtoken');

const auth = async(req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    jwt.verify(token, process.env.SECRET, async(err, user) => {
        if(err) {
            res.status(401).send({ success: false, message: err.message })
        }
        req.user = user
    })
    next();
}

module.exports = { auth }