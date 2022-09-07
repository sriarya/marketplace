const express = require("express");
const apiRouter = express.Router();

const authRoutes = require('./auth');
const buyerRoutes = require('./buyer');
const sellerRoutes = require('./seller');
const { validateToken } = require('../middlewares/authenticate');

apiRouter.use('/auth', authRoutes);
apiRouter.use(validateToken);
apiRouter.use('/buyer', buyerRoutes);
apiRouter.use('/seller', sellerRoutes);

module.exports = apiRouter;

