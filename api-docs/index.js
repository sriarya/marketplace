const { authDocs } = require('./authDocs');
const { sellerDocs } = require('./sellerDocs');
const { buyerDocs } = require('./buyerDocs');

const { paths: authPaths, definitions: authDefinitions } = authDocs;
const { paths: sellerPaths, definitions: sellerDefinitions } = sellerDocs;
const { paths: buyerPaths, definitions: buyerDefinitions } = buyerDocs;

const swaggerDocument = {
    openapi: "3.0.0",
    info: {
        version: "3.0",
        title: "Byjus Pay Server APIs",
        description: "Documentation of Byjus Pay Server Api's",
    },
    servers: [
        {
            url: `http://localhost:${process.env.PORT}/api`,
            description: "local",
        }
    ],
    tags: [
        {
            name: "Auth",
            description: "API to handle user login",
        },
        {
            name: "Buyers",
            description: "APIs exposed to buyers",
        },
        {
            name: "Sellers",
            description: "API exposed to sellers",
        }
    ],
    components: {
        securitySchemes: {
            Bearer: {
                type: "http",
                description: "Enter JWT Bearer token only",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        },
    },
    security: [
        {
            Bearer: [],
        }
    ],
    schemes: ["https", "http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    paths: {
        ...authPaths,
        ...sellerPaths,
        ...buyerPaths
    },
    definitions: {
        ...authDefinitions,
        ...sellerDefinitions,
        ...buyerDefinitions
    },
};

module.exports = {
    swaggerDocument,
};