const express = require('express');
const router = express.Router();


router.use((req, res, next) => {
    if (req.query.isAdmin) {
        next();
    }
    res.redirect('/login')
})
router.get("/", (req, res) => {
    res.send("it works");
});
module.exports = router