const userRouter = require('./users');

module.exports.routes = (app) => {
    app.use('/user', userRouter);
}