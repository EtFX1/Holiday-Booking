// Route to render the staff main page
const express = require("express");
const router = express.Router();
const { promisePool } = require("../services/db"); // Importing the database connection pool

// Route to render the staff main page
router.get("/main-page", async (req, res) => {
    const firstName = req.query.firstName || "Staff";

    try {
        // Query the database for the staff member's holiday allowance days
        const [results] = await promisePool.query(
            "SELECT id, holiday_allowance_days FROM staff_members WHERE first_name = ?",
            [firstName]
        );

        if (results.length > 0) {
            const staff = results[0];
            const holidayAllowance = staff.holiday_allowance_days;
            const staffId = staff.id;

            // Pass the firstName, holidayAllowance, and staffId to the template
            res.render("staff-main-page", { firstName, holidayAllowance, staffId });
        } else {
            res.render("staff-main-page", { firstName, holidayAllowance: 0, staffId: null });
        }
    } catch (err) {
        console.error("Error fetching holiday allowance:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Route to handle holiday request form submission
router.post("/request-holiday", async (req, res) => {
    const { 'staff-id': staffId, 'start-date': startDate, 'end-date': endDate, 'days-requested': daysRequested, reason } = req.body;

    // Debugging to check form submission data
    console.log("Form submission data:", req.body);

    try {
        // Insert the request into the requested_days table
        const sql = `
            INSERT INTO requested_days (staff_id, start_date, end_date, days_requested, reason)
            VALUES (?, ?, ?, ?, ?)
        `;
        const values = [staffId, startDate || null, endDate || null, daysRequested || 0, reason || ''];

        await promisePool.query(sql, values);
        console.log("Holiday request submitted");

        // Redirect or respond as needed
        res.redirect("/staff/main-page");
    } catch (err) {
        console.error("Error submitting holiday request:", err);
        res.status(500).send("Server error");
    }
});



/*
todo :
FIRST, figure out why start and end date are null 
Add the name of the staff to the database
send an alert to the user when they try to send a request with their no. of days being < 1 (or === 0)

*/



module.exports = router;