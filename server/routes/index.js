const express = require('express');
const registerRouter = require('./register');
const loginRouter = require('./login');
const logoutRouter = require('./logout');
const checkAuthRouter = require('./checkAuth');

const router = express.Router();

router.use('/register', registerRouter);
router.use('/login', loginRouter);
router.use('/logout', logoutRouter);
router.use('/check-auth', checkAuthRouter);

module.exports = router;