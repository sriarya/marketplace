const { getSellersListService } = require('../services/list')

const getListOfSellers = async (req, res) => {
    try {
        const { body } = req;
        const response = await getSellersListService(body);
        if (response.status == 'success') {
            res.status(200).json(response)
        } else {
            res.status(400).json(response)
        }
    } catch (err) {
        res.status(400).json({
            status: 'failure',
            message: 'An error occured during registration.Please try after some time.'
        })
    }
}

module.exports = {
    getListOfSellers
}