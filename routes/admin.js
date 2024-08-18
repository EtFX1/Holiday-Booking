const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config(); // Load environment variables from .env file

const { sendAdminPassword } = require("../services/emailService")


router.get("/login", (req, res) => {
    res.render("admin-login");
});

//handles a post request for a user to log in
router.post("/login", (req, res) => {
    const { password } = req.body;

    if (password === process.env.ADMIN_PASSWORD) {
        res.redirect("/admin/main-page"); // Redirect to the admin main page if the password is correct
    } else {
        res.send("<script>alert('Incorrect password. Please try again.'); window.location.href='/admin/login';</script>");
    }
});

//renders email page
router.get("/email-pswd", (req, res) => {
    res.render("email-pswd");
});

// Route to handle the form submission and send the email
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

router.get("/main-page", (req, res) => {
    res.render("admin-main-page");
});

module.exports = router;
