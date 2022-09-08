const express = require("express");
const apiRouter = express.Router();
const swaggerUi = require("swagger-ui-express");

const authRoutes = require('./auth');
const buyerRoutes = require('./buyer');
const sellerRoutes = require('./seller');
const { validateToken, validateBuyer, validateSeller } = require('../middlewares/authenticate');
const { swaggerDocument } = require("../api-docs");

apiRouter.use('/auth', authRoutes);
apiRouter.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
apiRouter.use(validateToken);
apiRouter.use('/buyer', validateBuyer, buyerRoutes);
apiRouter.use('/seller', validateSeller, sellerRoutes);

module.exports = apiRouter;

