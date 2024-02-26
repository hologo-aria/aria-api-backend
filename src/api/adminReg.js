const express = require("express");
const Admins = require("../model/admin");

const router = express.Router();

router.post("/", async (req, res) => {
  const {
    adminID,
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
    activeStatus

  } = req.body;


  const alreadyExistsAdmin = await Admins.findOne({
    where: { username },
  }).catch((err) => {
    console.log("Error: ", err);
  });



  if (alreadyExistsAdmin ) {
    return res
      .status(409)
      .json({ message: "Admin with username already exists!" });
  } else {
    const newAdmin = new Admins({
      adminID,
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
      activeStatus
    });
    const saveAdmin = await newAdmin.save().catch((err) => {
      console.log("Error: ", err);
      res.status(500).json({ error: "Cannot register Admin at the moment!" });
    });

    if (saveAdmin) res.json({ message: "Thanks for registering" });
  }
});

module.exports = router;
