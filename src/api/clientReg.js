const express = require("express");
const Clients = require("../model/clients");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/", async (req, res) => {
  const {
    clientID,
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

  const saltRounds = 10;

  const alreadyExistsClient = await Clients.findOne({
    where: { username },
  }).catch((err) => {
    console.log("Error: ", err);
  });



  if (alreadyExistsClient ) {
    return res
      .status(409)
      .json({ message: "Client with username already exists!" });
  } else {

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      console.log("Hashed Password:", hashedPassword);

    const newClient = new Clients({
      clientID,
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
      password:hashedPassword,
      accessLevel,
      activeStatus
    
    });
    const saveClient = await newClient.save().catch((err) => {
      console.log("Error: ", err);
      res.status(500).json({ error: "Cannot register Client at the moment!" });
    });

    if (saveClient) res.json({ message: "Thanks for registering" });
    
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Cannot register Admin at the moment!" });
  }}
});

module.exports = router;
