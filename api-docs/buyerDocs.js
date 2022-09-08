const buyerDocs = {
    "paths": {
        "/buyer/list-of-sellers": {
            "get": {
                "tags": [
                    "Buyers"
                ],
                "summary": "API to get a list of all sellers",
                "responses": {
                    "200": {
                        "description": "Sellers list fetched Succesfully!"
                    },
                    "400": {
                        "description": "Error while fetching the list of sellers"
                    },
                    "401": {
                        "description": "Access is denied.As only buyer can access the routes related to buyer.Please register with type 'buyer' and use the token to access Buyer APIs"
                    }
                }
            }
        },
        "/buyer/seller-catalog/{seller_id}": {
            "get": {
                "tags": [
                    "Buyers"
                ],
                "summary": "API to get the catalog of a seller by seller_id",
                "parameters": [{
                    "name": "seller_id",
                    "in": "path",
                    "description": "ID specific to the seller",
                    "required": true,
                    "style": "simple",
                    "examples": {
                        "seller_id": {
                            "value": "SLR-248196571226"
                        }
                    }
                }],
                "responses": {
                    "200": {
                        "description": "Seller catalog fetched succesfully!"
                    },
                    "400": {
                        "description": "Error while fetching the catalog"
                    },
                    "401": {
                        "description": "Access is denied.As only buyer can access the routes related to buyer.Please register with type 'buyer' and use the token to access Buyer APIs"
                    }
                }
            }
        },
        "/buyer/create-order/{seller_id}": {
            "post": {
                "tags": [
                    "Buyers"
                ],
                "summary": "API to send a list of items to create an order for seller with id",
                "parameters": [{
                    "name": "seller_id",
                    "in": "path",
                    "description": "ID specific to the seller",
                    "required": true,
                    "style": "simple",
                    "examples": {
                        "seller_id": {
                            "value": "SLR-248196571226"
                        }
                    }
                }],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/definitions/createOrder"
                            },
                            "example": {
                                "products": [{ productId: "PRD-452980043298", price: "300", name: "Sandals", currency: "USD", quantity: 1 },
                                { productId: "PRD-71704787028", price: "100", name: "Sports Shoes", currency: "USD", quantity: 1 }],
                                "totalOrderValue": "400",
                                "currency": "USD"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "User LoggedIn Succesfully!"
                    },
                    "400": {
                        "description": "Error while Logging In the user"
                    },
                    "401": {
                        "description": "Access is denied - As only buyer can access the routes related to buyer.Please register with type 'buyer' and use the token to access Buyer APIs"
                    }
                }
            }
        }
    },
    "definitions": {
        "createOrder": {
            "required": [
                "products",
                "totalOrderValue",
                "sellerId",
                "currency"
            ],
            "properties": {
                "products": {
                    "type": "array"
                },
                "totalOrderValue": {
                    "type": "number"
                },
                "sellerId": {
                    "type": "string"
                },
                "currency": {
                    "type": "string"
                }
            }
        }
    }
}

module.exports = {
    buyerDocs
}