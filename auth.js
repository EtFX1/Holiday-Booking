const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

app.use(express.json()); //allows you to send and receive JSON

//Stores user's name and password
const users = [];

app.get("/users", (req, res) => {
    res.json(users);
});

//*When a post request is sent (when a user sign's up with their name and password, this function hashes their password and saves it in the "users" array)
app.post("/users", async (req, res) => {
    try {

        //* creating a salt and a hashed password out of the user's "password"
        const hashedPswd = await bcrypt.hash(req.body.password, 10);

        //* creating a user, and pushing their credentials in the "users" array 
        //"user" stores the user's credentials coming from the post request
        const user = { name: req.body.name, password: hashedPswd };
        users.push(user); // pushes the credentials into the "user's" array (a pretend database of user info)
        res.status(201).send();
    } catch {
        res.status(500).send();
    }
});


app.post("/users/login", async (req, res) => {
    const user = users.find(user => user.name = req.body.name); //checks if the  user's details are in the "users" list
    if (user === null) {
        return res.status(400).send("Cannot find user");
    }

    try {
        if (await bcrypt.compare(req.password, user.password)) {
            res.send("Success");
        } else {
            res.send("Wrong login details");
        }
    } catch {
        res.status(500).send();
    }
})


/*login a user. so it checks the database to see if the username, and the password are actually inside the database  */


app.listen(3000);