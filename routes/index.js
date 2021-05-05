const userRouter = require('./users');
const categoryRouter = require('./category');
const postRouter = require('./post');

module.exports.routes = (app) => {
    app.use('/user', userRouter);
    app.use('/categories', categoryRouter);
    app.use('/posts', postRouter);
}