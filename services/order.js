const Promise = require('bluebird');

const { Orders, Products } = require('../models');
const { generateId } = require('../utils/helper');
const { validatePayload } = require('../utils/validate')

const createOrderService = async (data) => {
    try {
        const { products = [], user = {}, totalOrderValue = '', sellerId = '', currency = '' } = data;
        const isValidOrderPayload = validatePayload({ products, totalOrderValue, sellerId, currency })
        const { userId: buyerId } = user;
        if (isValidOrderPayload) {
            await Promise.map(products, async (product) => {
                const { productId, quantity: quantityRequested } = product;

                if (quantityRequested == 0) {
                    throw Error(JSON.stringify({
                        status: 'failure',
                        message: 'The product quantity cannot be 0.Please add valid quantity.',
                        data: { product }
                    }));
                }

                const productDataInDb = await Products.findOne({ productId }, { productId: 1, price: 1, quantity: 1, name: 1, currency: 1, _id: 0 }) || [{}];
                const { quantity: quantityInDb = 0 } = productDataInDb;
                if (quantityInDb == 0) {
                    throw Error(JSON.stringify({
                        status: 'failure',
                        message: 'The product requested is out of stock.Order cannot be placed.',
                        data: { product: productDataInDb }
                    }));

                } else if (quantityInDb < quantityRequested) {
                    throw Error(JSON.stringify({
                        status: 'failure',
                        message: `The requested quantity is unavaiable.Please update your order.`,
                        data: { product: productDataInDb }
                    }));

                } else {
                    const updatedQuantity = Number(quantityInDb) - Number(quantityRequested);
                    await Products.updateOne({ productId }, { "$set": { quantity: updatedQuantity } });
                }
            }, { concurrency: 1 })
            const orderId = generateId('ODR');
            await Orders.create({
                orderId,
                products,
                currency,
                buyerId,
                sellerId,
                totalOrderValue: Number(totalOrderValue)
            })

            return {
                status: 'success',
                message: 'Order created successfully!'
            }
        } else {
            return {
                status: 'failure',
                message: 'Required fields missing!Please enter all the required data.'
            }
        }

    } catch (err) {
        console.log('Error creating order', JSON.stringify(err.message || err))
        if (/^{"status/.test(err.message)) {
            return JSON.parse(err.message);
        } else {
            return {
                status: 'failure',
                message: 'Error while creating order!Please retry after sometime.'
            }
        }

    }
}


const getOrdersService = async (data) => {
    try {
        const { user } = data;
        const { userId } = user;
        const orders = await Orders.find({ sellerId: userId }, { "_id": 0, "products._id": 0 }).lean();
        return {
            status: 'success',
            message: 'Orders fetched successfully!',
            data: {
                orders
            }
        }
    } catch (err) {
        console.log('Error getting order details', err)
        return {
            status: 'failure',
            message: 'Error while getting order details!Please retry after sometime.'
        }
    }
}

module.exports = {
    createOrderService,
    getOrdersService
}