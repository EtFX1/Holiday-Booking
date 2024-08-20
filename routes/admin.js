const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { promisePool } = require("../services/db"); // Correctly destructure promisePool

// if your password is correct, then the route below is shown (req. from admin-login.ejs)
router.get("/manage-requests", (req, res) => {
    res.render("admin-manage-requests"); // Renders the "manage-requests" page
});

//renders the "manage staff" page (req. from manage-requests.ejs)
//this route also queries the database to see whether there are staff in the database. The result of the query is sent back to manage-requests.ejs
router.get("/manage-staff", async (req, res) => {
    try {
        // Query to the first and last names of staff members
        const [results] = await promisePool.query("SELECT first_name, last_name FROM staff_members");
        const staffMembers = results; // Array of staff members

        res.render("admin-manage-staff", { staffMembers });
    } catch (err) {
        console.error("Error fetching staff data: ", err);
        res.status(500).send("Internal Server Error");
    }
});


// Route to handle inserting a staff member's credentials into the database (req. from admin-manage-requests.ejs)
router.post("/add-staff", async (req, res) => {

    //extracts the values from the request body that has been sent using object destructuring
    const { firstName, lastName, password, holidayAllowance } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // SQL that will be used to query the database
        const sql = `
            INSERT INTO staff_members (first_name, last_name, holiday_allowance_days, password)
            VALUES (?, ?, ?, ?)
        `;
        const values = [firstName, lastName, holidayAllowance, hashedPassword];

        //querying the database with the sql and the values with the pool 
        await promisePool.query(sql, values);
        console.log("Staff member added");
        res.redirect("/admin/manage-staff");
    } catch (err) {
        console.error("Error handling form submission:", err);
        res.status(500).send("Server error");
    }
});

// Route to handle deleting a staff member (req. from admin-manage-staff.ejs)
router.post("/delete-staff", async (req, res) => {
    const { firstName, lastName } = req.body; // gets the first and last names from the form 

    try {
        // SQL to delete the staff member
        const sql = "DELETE FROM staff_members WHERE first_name = ? AND last_name = ?";
        const values = [firstName, lastName];

        await promisePool.query(sql, values);
        console.log("Staff member deleted");
        res.redirect("/admin/manage-staff");
    } catch (err) {
        console.error("Error deleting staff member:", err);
        res.status(500).send("Server error");
    }
});

module.exports = router;
