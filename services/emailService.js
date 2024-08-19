const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env file

// Function to send the admin password via email
function sendAdminPassword(userEmail, callback) {
    const adminPassword = process.env.ADMIN_PASSWORD;

    // Set up nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: "Gmail", // e.g., 'Gmail' or other email service
        auth: {
            user: process.env.EMAIL_USER, // Your email
            pass: process.env.EMAIL_PASS, // Your email password
        },
    });

    // Define email options
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: "Your Admin Password",
        text: `The admin password is: ${adminPassword}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        callback(error, info);
    });
}

module.exports = {
    sendAdminPassword,
};
