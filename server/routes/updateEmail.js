const express = require("express");
const updateEmailController = require("../middleware/emailUpdater");


const router = express.Router();

router.post("/", updateEmailController);

module.exports = router;
