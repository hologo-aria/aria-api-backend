const express = require("express");
const Admins = require("../model/admin");
const Users = require("../model/users")
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/", async (req, res) => {
  const {
    firstname,
    lastname,
    organization,
    email,
    mobile,
    country,
    addressLine,
    addressLineTwo,
    timeZone,
    zipcode,
    username,
    password,
    accessLevel,
    activeStatus,
  } = req.body;

  const saltRounds = 10;
  const alreadyExistsAdmin = await Users.findOne({
    where: { username },
  }).catch((err) => {
    console.log("Error: ", err);
  });

  if (alreadyExistsAdmin) {
    return res
      .status(409)
      .json({ message: "Admin with username already exists!" });
  } 
  else {
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      console.log("Hashed Password:", hashedPassword);

      // Create a new admin object with the hashed password
      const newAdmin = new Admins({
        firstname,
        lastname,
        organization,
        email,
        mobile,
        country,
        addressLine,
        addressLineTwo,
        timeZone,
        zipcode,
        username,
        password: hashedPassword, // Assign the hashed password here
        accessLevel,
        activeStatus,
      });
      const savedAdmin = await newAdmin.save();

      const adminID = savedAdmin.adminID;

      const newUser = new Users ({
        ownerID : adminID,
        usertype : "Admin",
        username,
        password : hashedPassword,
        organization,
        accesslevel:accessLevel
      })

      // Save the new admin to the database
      const saveUser = await newUser.save();

      res.json({ message: "Thanks for registering" });
    } catch (error) {
      console.error("Error: ", error);
      res.status(500).json({ error: "Cannot register Admin at the moment!" });
    }
  }
});

module.exports = router;
