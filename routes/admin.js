const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Admin")
});

// Route to render admin-login EJS page
router.get("/login", (req, res) => {
    res.render("admin-login");
});

// Route to render admin-main-page EJS page
router.get("/main-page", (req, res) => {
    res.render("admin-main-page");
});


module.exports = router;