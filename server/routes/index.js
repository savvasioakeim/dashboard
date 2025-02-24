const express = require('express');
const registerRouter = require('./register');
const loginRouter = require('./login');
const logoutRouter = require('./logout');
const checkAuthRouter = require('./checkAuth');
const checkPasswordRouter = require('./checkPassword')
const updatePasswordRouter = require('./updatePassword')
const updateNameRouter = require("./updateName");
const updateEmailRouter = require("./updateEmail");

const router = express.Router();

router.use('/register', registerRouter);
router.use('/login', loginRouter);
router.use('/logout', logoutRouter);
router.use('/check-auth', checkAuthRouter);
router.use('/check-password', checkPasswordRouter)
router.use('/update-password', updatePasswordRouter)
router.use('/update-name', updateNameRouter)
router.use('/update-email', updateEmailRouter)

module.exports = router;