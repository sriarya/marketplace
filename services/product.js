const Promise = require('bluebird');
const { isEmpty } = require('lodash');

const { Users, Products } = require('../models');
const { generateId } = require('../utils/helper');
const { validatePayload } = require('../utils/validate');

const getSellerCatalogService = async (data) => {
    try {
        const { sellerId } = data;
        const catalog = await Products.find({ sellerId }, { createdAt: 0, updatedAt: 0, _id: 0 }) || [];
        return {
            status: 'success',
            message: 'Successfully fetched the seller catalog.',
            data: {
                catalog
            }
        }
    } catch (err) {
        console.log('Error while fetching the catalog data!', err);
        return {
            status: 'failure',
            message: 'Error while fetching the catalog data!'
        }
    }
}

const createCatalogService = async (data) => {
    try {
        const { products = [], catalog = '', user = {} } = data;
        const { userId } = user;
        const isValidCatalogPayload = validatePayload({ products, catalog })

        if (isValidCatalogPayload) {
            const { catalog: catalogInDb } = await Users.findOne({ userId }, { catalog: 1 });

            if (catalogInDb && catalogInDb !== catalog) {
                return {
                    status: 'failure',
                    message: 'A catalog is already associated with the seller.Please rename/delete the catalog to create a new one, or add items to the existing one'
                }
            }

            await Users.updateOne({ userId }, { "$set": { catalog } });
            await Promise.map(products, async (product) => {
                const { name, price, currency, quantity } = product
                const productDetailsInDB = await Products.findOne({ name }).lean();
                const isProductAlreadyPresent = !isEmpty(productDetailsInDB) ? true : false;

                if (isProductAlreadyPresent) {
                    const { productId } = productDetailsInDB;
                    await Products.updateOne({ productId }, {
                        "$set": {
                            name,
                            quantity: Number(quantity),
                            price: Number(price),
                            catalog,
                            currency,
                            sellerId: userId
                        }
                    })
                } else {
                    const productId = generateId('PRD');
                    await Products.create({
                        productId,
                        name,
                        quantity: Number(quantity),
                        price: Number(price),
                        catalog,
                        currency,
                        sellerId: userId
                    })
                }
            }, { concurrency: 1 })

            return {
                status: 'success',
                message: 'Successfully created the catalog.'
            }
        } else {
            return {
                status: 'failure',
                message: 'Required fields missing!Please enter all the required data.'
            }
        }
    } catch (err) {
        console.log('Error while creating the catalog!', err);
        return {
            status: 'failure',
            message: 'Error while creating catalog!Please try after some time.'
        }
    }
}

module.exports = {
    getSellerCatalogService,
    createCatalogService
}