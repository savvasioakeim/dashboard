const express = require('express');
const { updatePassword } = require('../middleware/passwordUpdater');
const router = express.Router();


router.post('/', updatePassword);

module.exports = router;
