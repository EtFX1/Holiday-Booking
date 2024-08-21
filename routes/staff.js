const express = require("express");
const router = express.Router();

// Route to render the staff main page
router.get("/main-page", (req, res) => {
    res.render("staff-main-page");
});

module.exports = router;