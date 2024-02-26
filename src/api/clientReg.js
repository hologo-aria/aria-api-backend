const express = require("express");
const Clients = require("../model/clients");

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
      password,
      accessLevel,
      activeStatus
    
    });
    const saveClient = await newClient.save().catch((err) => {
      console.log("Error: ", err);
      res.status(500).json({ error: "Cannot register Client at the moment!" });
    });

    if (saveClient) res.json({ message: "Thanks for registering" });
  }
});

module.exports = router;
