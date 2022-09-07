const moment = require('moment');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const { User } = require('../models/user');
const { validateRegistrationPayload } = require('../utils/validate');
const { generateId } = require('../utils/helper');
const { TOKEN_SECRET } = process.env;

const userRegistrationService = (data) => {
    try {
        const isValidPayload = validateRegistrationPayload(data);
        if (isValidPayload) {
            const { firstName = '', lastName = '', type = '', password = '', email = '' } = data;
            const isAnExistingUser = checkIfUserExists(email);

            if (isAnExistingUser) {
                return {
                    status: 'failure',
                    message: 'Account already exists.Please login!'
                }
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const userId = type == 'seller' ? generateId('SLR') : generateId('BYR');
            let token = jwt.sign({ userId, email }, TOKEN_SECRET, { expiresIn: '24h' });

            await User.create({
                userId,
                firstName,
                lastName,
                type,
                password: hashedPassword,
                email,
                token,
                createdAt: moment().toDate()
            })


            return {
                status: 'success',
                message: 'User Registration success!',
                token
            }

        } else {
            return {
                status: 'failure',
                message: 'Required fields missing!Please enter all the required data.'
            }
        }
    } catch (err) {
        console.log('Error while registering the user', err);
        return {
            status: 'failure',
            message: 'An error occured during registration.Please try after some time.'
        }
    }
}

const userLoginService = async (data) => {
    const { email, password } = data;
    try {
        const user = await User.findOne({ email });
        if (!isEmpty(user)) {
            const { password: passwordInDb, userId } = user;
            const isValidPassword = await bcrypt.compare(passwordInDb, password);
            if (isValidPassword) {
                let token = jwt.sign({ userId, email }, TOKEN_SECRET, { expiresIn: '24h' });
                await User.updateOne({ userId }, { "$set": { token } })
                return {
                    status: 'success',
                    message: 'User LoggedIn successsfully!',
                    token
                }
            } else {
                return {
                    status: 'failure',
                    message: 'Invalid password.Please enter valid credentials.'
                }
            }
        } else {
            return {
                status: 'failure',
                message: 'Invalid username.Please enter valid credentials.'
            }
        }
    } catch (err) {
        console.log(`Error during Login for the user - ${email}`, err);
        return {
            status: 'failure',
            message: 'An error occured during Login.Please try after some time.'
        }
    }
}

const checkIfUserExists = async (email) => {
    const userData = await User.findOne({ email });
    return !isEmpty(userData) ? true : false
}

module.exports = {
    userRegistrationService,
    userLoginService
}