const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env file

//imports function that sends the admin password
const { sendAdminPassword } = require("../services/emailService");

//!Login page routes
//Route that renders the admin login page
router.get("/", (req, res) => {
    res.render("admin-login");
});

//handles a post request for a user to log in
router.post("/", (req, res) => {
    const { password } = req.body;

    if (password === process.env.ADMIN_PASSWORD) {
        res.redirect("/admin/main-page"); // Redirect to the admin main page if the password is correct
    } else {
        res.send("<script>alert('Incorrect password. Please try again.'); window.location.href='/admin-login';</script>");
    }
});

//!Email routes
//renders the email admin password 
router.get("/email-pswd", (req, res) => {
    res.render("email-pswd");
});

// Route to handle the email form submission and send the email
router.post("/send-pswd", (req, res) => {
    const userEmail = req.body.email;
    sendAdminPassword(userEmail, (error, info) => {
        if (error) {
            console.log(error);
            res.send("<script>alert('Failed to send email. Please try again.'); window.location.href='/admin/email-pswd';</script>");
        } else {
            console.log("Email sent: " + info.response);
            res.send("<script>alert('Password has been sent to your email.'); window.location.href='/admin/login';</script>");
        }
    });
});

module.exports = router;
