const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Staff")
});

// Route to render admin-login EJS page
router.get("/login", (req, res) => {
    res.render("staff-login");
});

// Route to render admin-main-page EJS page
router.get("/main-page", (req, res) => {
    res.render("staff-main-page");
});


module.exports = router;