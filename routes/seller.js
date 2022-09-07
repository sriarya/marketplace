const express = require('express');
const router = express.Router();

const { createCatalog } = require('../controllers/product');
const { fetchOrders } = require('../controllers/order')

router.post('/create-catalog', createCatalog)
router.get('/orders', fetchOrders)