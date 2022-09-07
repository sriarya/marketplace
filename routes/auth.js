const express = require('express')
const router = express.Router();

const { handleUserRegistration, handleUserLogin } = require('../controllers/auth')

router.post('/register', handleUserRegistration);
router.post('/login', handleUserLogin);

module.exports = router;
