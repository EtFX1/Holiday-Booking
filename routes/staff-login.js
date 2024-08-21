const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { promisePool } = require("../services/db"); // Importing the database connection pool

// Route to render the staff login page
// This route handles GET requests to the root of the staff-login endpoint
router.get("/", (req, res) => {
    // Render the staff-login EJS template, passing an empty errors object for initial load
    res.render("staff-login", { errors: {} });
});

// Route to handle form submission for staff login
// This route handles POST requests to the root of the staff-login endpoint
router.post("/", async (req, res) => {
    // Extract form data from the request body
    const { 'first-name': firstName, 'last-name': lastName, password } = req.body;

    try {
        // Query the database to find a staff member with the provided first and last names
        const [results] = await promisePool.query(
            "SELECT id, first_name, last_name, password FROM staff_members WHERE first_name = ? AND last_name = ?",
            [firstName, lastName]
        );

        // Check if any results were returned
        if (results.length === 0) {
            // No staff member was found with the given names
            // Render the login page with error messages indicating incorrect first and/or last name
            res.render("staff-login", {
                errors: {
                    firstName: "First name incorrect",
                    lastName: "Last name incorrect",
                    password: null,
                },
            });
            return; // Exit the function to prevent further processing
        }

        // Retrieve the first staff member from the results
        const staff = results[0];

        // Compare the provided password with the hashed password stored in the database
        const match = await bcrypt.compare(password, staff.password);

        if (match) {
            // Password matches; login is successful
            // Redirect the user to the staff main page
            res.redirect("/staff/main-page");
        } else {
            // Password does not match
            // Render the login page with an error message indicating incorrect password
            res.render("staff-login", {
                errors: {
                    firstName: null,
                    lastName: null,
                    password: "Password incorrect",
                },
            });
        }
    } catch (err) {
        // Catch any errors that occur during the login process
        console.error("Error during login:", err);
        // Respond with a 500 Internal Server Error status
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router; // Export the router to be used in other parts of the application
