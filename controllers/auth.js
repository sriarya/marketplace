const { userRegistrationService, userLoginService } = require('../services/auth')

const handleUserRegistration = async (req, res) => {
    try {
        const { body } = req;
        const response = await userRegistrationService(body);
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

const handleUserLogin = async (req, res) => {
    try {
        const { body } = req;
        const response = await userLoginService(body);
        if (response.status == 'success') {
            res.status(200).json(response)
        } else {
            res.status(400).json(response)
        }
    } catch (err) {
        res.status(400).json({
            status: 'failure',
            message: 'An error occured during Login.Please try after some time.'
        })
    }
}

module.exports = {
    handleUserLogin,
    handleUserRegistration
}