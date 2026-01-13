const routerx = require('express-promise-router');
const paymentRouter = require('./paymentRouter');
const authRouter = require('./authRouter');
const Router = routerx();

Router.use('/v0/payment', paymentRouter);
Router.use('/auth', authRouter);

module.exports = Router;