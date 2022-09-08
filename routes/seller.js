const express = require('express');
const router = express.Router();

const { createCatalog } = require('../controllers/product');
const { getOrders } = require('../controllers/order')

router.post('/create-catalog', createCatalog)
router.get('/orders', getOrders)

module.exports = router;