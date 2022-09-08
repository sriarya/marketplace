const { Users } = require('../models');

const getSellersListService = async () => {
    try {
        const sellers = await Users.aggregate([
            { "$match": { type: 'seller' } },
            { "$project": { sellerId: "$userId", name: 1, catalog: 1, emailId: 1 } }
        ])
        return {
            status: 'success',
            message: 'Sellers List fetched successfully!',
            data: { sellers }
        }
    } catch (err) {
        console.log('Error while fetching the list of sellers!', err);
        return {
            status: 'failure',
            message: 'Error while fetching the list of sellers.Please try after sometime.SS'
        }
    }
}

module.exports = {
    getSellersListService
}