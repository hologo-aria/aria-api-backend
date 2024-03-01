const express = require("express");
const Admins = require("../model/admin");
const Clients = require("../model/clients");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists in the Admins table
    let user = await Admins.findOne({ where: { username } });

    // If not found in Admins table, check in Clients table
    if (!user) {
      user = await Clients.findOne({ where: { username } });
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
    const payload = {
      user: {
        id: user.adminID,
        username: user.username,
        organization: user.organization,
        accessLevel: user.accessLevel,
        // You can include other user details in the payload if needed
      },
    };
    if (user) {
      res.status(200).json(payload.user);
    }
    // Sign the token
    //   jwt.sign(payload, "your_secret_key", { expiresIn: "1h" }, (err, token) => {
    //     if (err) throw err;
    //     res.json({ token });
    //   });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
