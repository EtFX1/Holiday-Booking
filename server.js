const express = require("express"); // Import the express library
const dotenv = require("dotenv");
dotenv.config();

const app = express(); // Create an Express application

app.set("view engine", "ejs"); // Set EJS as the view engine

// Serve static files (like your HTML) from the 'public' directory
app.use(express.static("public"));

// Middleware to parse URL-encoded form data (from forms)
app.use(express.urlencoded({ extended: true }));

// Import database module
const { pool } = require("./services/db");

// Make the database connection available globally
app.set("db", pool);

//!Routes
// Route to serve the HTML file (home page)
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// Import route modules
const adminRouter = require("./routes/admin");
const staffRouter = require("./routes/staff");
const adminLoginRouter = require("./routes/admin-login");

// Use route modules
app.use("/admin", adminRouter);
app.use("/staff", staffRouter);
app.use("/admin-login", adminLoginRouter);

// Start the server on port 3000
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
