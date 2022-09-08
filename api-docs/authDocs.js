const authDocs = {
    "paths": {
        "/auth/register": {
            "post": {
                "tags": [
                    "Auth"
                ],
                "summary": "API to register a User",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/definitions/registerUser"
                            },
                            "example": {
                                "name": 'JAmes Software',
                                "type": 'seller',
                                "password": 'asjfj12312',
                                "emailId": 'asda@gmasd.com'
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "User Registered Succesfully!"
                    },
                    "400": {
                        "description": "Error while registering the user"
                    }
                }
            }
        },
        "/auth/login": {
            "post": {
                "tags": [
                    "Auth"
                ],
                "summary": "API to Login a User",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/definitions/loginUser"
                            },
                            "example": {
                                "emailId": 'jfkdsh@ajsdh.com',
                                "password": 'sdjsdkfj'
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
                    }
                }
            }
        }
    },
    "definitions": {
        "registerUser": {
            "required": [
                "name",
                "password",
                "type",
                "emailId"
            ],
            "properties": {
                "name": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                },
                "type": {
                    "type": "string"
                },
                "emailId": {
                    "type": "string"
                }
            }
        },
        "loginUser": {
            "required": [
                "password",
                "emailId"
            ],
            "properties": {
                "password": {
                    "type": "string"
                },
                "emailId": {
                    "type": "string"
                }
            }
        }
    }
}

module.exports = {
    authDocs
}