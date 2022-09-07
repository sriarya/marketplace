const express = require('express');
const router = express.Router();

const { getListOfSellers, } = require('../controllers/list');
const { getSellerCatalog } = require('../controllers/product');
const { createOrder } = require('../controllers/order');

router.get('/list-of-sellers', getListOfSellers);
router.get('/seller-catalog/:seller_id', getSellerCatalog);
router.post('/create-order/:seller_id', createOrder);
