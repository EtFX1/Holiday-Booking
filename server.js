const express = require("express"); // Import the express library
const app = express(); // Create an Express application


app.set("view engine", "ejs"); // Set EJS as the view engine

// Serve static files (like your HTML) from the 'public' directory
app.use(express.static("public"));

// Middleware to parse URL-encoded form data (from forms)
app.use(express.urlencoded({ extended: true }));

// Route to serve the HTML file (home page)
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

//importing the file that has all the routes we want to go to
const adminRouter = require("./routes/admin");
const staffRouter = require("./routes/staff");

//Any route that has /users, add all the imported routes to the end of it
app.use("/admin", adminRouter);
app.use("/staff", staffRouter);


// Start the server on port 3000
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
