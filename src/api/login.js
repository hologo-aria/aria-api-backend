const express = require("express");
const Admins = require("../model/admin");
const Clients = require("../model/clients");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  var userID = "";
  var ownerType = "";

  try {
    // Check if the user exists in the Admins table
    let user = await Admins.findOne({ where: { username } });
    if (user) {
      userID = user.adminID;
    }
    // If not found in Admins table, check in Clients table
    if (!user) {
      user = await Clients.findOne({ where: { username } });
      userID = user.clientID;
      if (!user) {
        // If user not found in both tables, return error
        return res
          .status(400)
          .json({ message: "Invalid username or password" });
      }
    }

    // Check if the provided password matches the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const determineOwnerType = (id) => {
      if (id.startsWith("cli")) {
        ownerType = "Client";
      } else if (id.startsWith("adm")) {
        ownerType = "Admin";
      } else {
        ownerType = "";
      }
    };

    determineOwnerType(userID);

    const payload = {
      user: {
        id: userID,
        username: user.username,
        organization: user.organization,
        accessLevel: user.accessLevel,
        userType: ownerType
        // You can include other user details in the payload if needed
      },
    };
    if (user) {
      jwt.sign(payload, process.env.REACT_APP_SECRET_KEY, { expiresIn: "1h" }, (err, token) => {
        if (err) throw err;
        res.json({ payload,token });
      });
    }
    // Sign the token
   
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
