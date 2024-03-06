const express = require("express");
const Admins = require("../model/admin");
const Clients = require("../model/clients");
const Users = require("../model/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await Users.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Generate new refreshToken
    const refreshtoken = jwt.sign(
      { "username": user.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    // Update user's refreshToken field
    await Users.update({ refreshtoken }, { where: { username } });

    const accessToken = jwt.sign(
      { "username": user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30s' }
    );

    const payload = {
      user: {
        id: user.ownerID,
        username: user.username,
        organization: user.organization,
        accessLevel: user.accessLevel,
        userType: user.usertype
      },
    };
    
    // Set refreshToken as a cookie
    res.cookie('jwt', refreshtoken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
    res.json({ payload, accessToken });
  
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});


module.exports = router;
