const { getSellerCatalogService, createCatalogService } = require('../services/product')

const getSellerCatalog = async (req, res) => {
    try {
        const { seller_id: sellerId = '' } = req.params;
        const response = await getSellerCatalogService({ sellerId });
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

const createCatalog = async (req, res) => {
    try {
        const { body } = req;
        const response = await createCatalogService(body);
        if (response.status == 'success') {
            res.status(200).json(response)
        } else {
            res.status(400).json(response)
        }
    } catch (err) {
        res.status(400).json({
            status: 'failure',
            message: 'An error occured while creating catalog.Please try after some time.'
        })
    }
}

module.exports = {
    getSellerCatalog,
    createCatalog
}