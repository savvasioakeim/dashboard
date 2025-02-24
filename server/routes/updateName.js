const express = require("express");
const updateNameController = require("../middleware/nameUpdater");


const router = express.Router();

router.post("/", updateNameController);

module.exports = router;
