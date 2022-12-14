const sellerDocs = {
    "paths": {
        "/seller/create-catalog": {
            "post": {
                "tags": [
                    "Sellers"
                ],
                "summary": "API to create a catalog.Send a list of items to create a catalog for a seller",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/definitions/catalog"
                            },
                            "example": {
                                "products": [{ price: 300, name: "Sandals", currency: "USD", quantity: 5 },
                                { price: 100, name: "Sports Shoes", currency: "USD", quantity: 4 }],
                                "catalog": "Footwear"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Catalog created Succesfully!"
                    },
                    "400": {
                        "description": "Error while creating Catalog."
                    },
                    "401": {
                        "description": "Access is denied - As only seller can access the routes related to seller.Please register with type 'seller' and use the token to access Seller APIs"
                    }
                }
            }
        },
        "/seller/orders": {
            "get": {
                "tags": [
                    "Sellers"
                ],
                "summary": "API to retrieve the list of orders received by a seller",
                "responses": {
                    "200": {
                        "description": "Orders list retrieved Succesfully!"
                    },
                    "400": {
                        "description": "Error while fetching the orders list"
                    },
                    "401": {
                        "description": "Access is denied - As only seller can access the routes related to seller.Please register with type 'seller' and use the token to access Seller APIs"
                    }
                }
            }
        }
    },
    "definitions": {
        "catalog": {
            "required": [
                "products",
                "catalog"
            ],
            "properties": {
                "products": {
                    "type": "string"
                },
                "catalog": {
                    "type": "string"
                }
            }
        }
    }
}

module.exports = {
    sellerDocs
}