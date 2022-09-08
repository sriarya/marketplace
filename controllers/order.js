const { createOrderService, getOrdersService } = require('../services/order')

const createOrder = async (req, res) => {
    try {
        const { seller_id: sellerId } = req.params;
        const { body } = req;
        const response = await createOrderService({ sellerId, ...body });
        if (response.status == 'success') {
            res.status(200).json(response)
        } else {
            res.status(400).json(response)
        }
    } catch (err) {
        res.status(400).json({
            status: 'failure',
            message: 'An error occured while fetching the seller catalog.Please try after some time.'
        })

    }
}

const getOrders = async (req, res) => {
    try {
        const { body } = req;
        const response = await getOrdersService(body);
        if (response.status == 'success') {
            res.status(200).json(response)
        } else {
            res.status(400).json(response)
        }
    } catch (err) {
        res.status(400).json({
            status: 'failure',
            message: 'An error occured while fetching the seller catalog.Please try after some time.'
        })
    }
}

module.exports = {
    createOrder,
    getOrders
}