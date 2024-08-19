const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { promisePool } = require("../services/db"); // Correctly destructure promisePool

// Route to handle loading the main page
router.get("/main-page", async (req, res) => {
    try {
        const [results] = await promisePool.query("SELECT COUNT(*) AS count FROM staff_members");
        const staffCount = results[0].count;
        res.render("admin-manage-requests", { staffCount });
    } catch (err) {
        console.error("Error fetching staff data: ", err);
        res.status(500).send("Internal Server Error");
    }
});

// Route to handle adding a staff member
router.post("/add-staff", async (req, res) => {
    const { firstName, lastName, password, holidayAllowance } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the staff member into the database
        const sql = `
            INSERT INTO staff_members (first_name, last_name, holiday_allowance_days, password)
            VALUES (?, ?, ?, ?)
        `;
        const values = [firstName, lastName, holidayAllowance, hashedPassword];

        await promisePool.query(sql, values);
        console.log("Staff member added");
        res.redirect("/admin/main-page");
    } catch (err) {
        console.error("Error handling form submission:", err);
        res.status(500).send("Server error");
    }
});

module.exports = router;
