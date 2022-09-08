const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { isEmpty, isArray } = require('lodash');

const { Users } = require('../models');
const { validatePayload } = require('../utils/validate');
const { generateId } = require('../utils/helper');
const { TOKEN_SECRET } = process.env;

const userRegistrationService = async (data) => {
    try {
        const { name = '', type = '', password = '', emailId = '' } = data;
        const isValidPayload = validatePayload({ name, type, password, emailId });
        if (isValidPayload) {
            const isAnExistingUser = (type == 'seller') ? await checkIfUserExists([{ emailId }, { name }]) : await checkIfUserExists({ emailId })

            if (isAnExistingUser) {
                return {
                    status: 'failure',
                    message: 'Account already exists.Please login!'
                }
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const userId = type == 'seller' ? generateId('SLR') : generateId('BYR');
            let token = jwt.sign({ userId, emailId }, TOKEN_SECRET, { expiresIn: '24h' });

            await Users.create({
                userId,
                name,
                type,
                password: hashedPassword,
                emailId,
                token
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
    const { emailId = '', password = '' } = data;
    try {
        if (isEmpty(emailId) || isEmpty(password)) {
            return {
                status: 'failure',
                message: 'Required fields missing!Please enter all the required data.'
            }
        }

        const user = await Users.findOne({ emailId });
        if (!isEmpty(user)) {
            const { password: passwordInDb, userId } = user;
            const isValidPassword = await bcrypt.compare(password, passwordInDb);
            if (isValidPassword) {
                let token = jwt.sign({ userId, emailId }, TOKEN_SECRET, { expiresIn: '24h' });
                await Users.updateOne({ userId }, { "$set": { token } })
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
                message: 'There is no account associated with these credentials.Please register.'
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

const checkIfUserExists = async (filter) => {
    try {
        let query = filter;
        if (isArray(filter)) {
            query = { "$or": filter }
        }
        const userData = await Users.findOne(query).lean() || [];
        return !isEmpty(userData) ? true : false
    } catch (err) {
        console.log('Error while registering the user', JSON.stringify(err));
        return {
            status: 'failure',
            message: 'An error occured during registration.Please try after some time.'
        }
    }
}

module.exports = {
    userRegistrationService,
    userLoginService
}