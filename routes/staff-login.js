const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { promisePool } = require("../services/db"); // Importing the database connection pool

// Route to render the staff login page
router.get("/", (req, res) => {
    res.render("staff-login", { errors: {} });
});

// Route to handle form submission for staff login
router.post("/", async (req, res) => {
    const { 'first-name': firstName, 'last-name': lastName, password } = req.body;

    try {
        const [results] = await promisePool.query(
            "SELECT id, first_name, last_name, password FROM staff_members WHERE first_name = ? AND last_name = ?",
            [firstName, lastName]
        );

        if (results.length === 0) {
            res.render("staff-login", {
                errors: {
                    firstName: "First name incorrect",
                    lastName: "Last name incorrect",
                    password: null,
                },
            });
            return;
        }

        const staff = results[0];
        const match = await bcrypt.compare(password, staff.password);

        if (match) {
            // Redirect with the first name in the query string
            res.redirect(`/staff/main-page?firstName=${encodeURIComponent(staff.first_name)}`);
        } else {
            res.render("staff-login", {
                errors: {
                    firstName: null,
                    lastName: null,
                    password: "Password incorrect",
                },
            });
        }
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
