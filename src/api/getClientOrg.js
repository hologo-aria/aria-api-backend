const express = require("express");
const router = express.Router();
const db = require("../database");
const Clients = require("../model/clients");

router.get("/", async (req, res) => {
    try {
      const organization = await Clients.findAll({ attributes:["organization"] });
      res.status(200).json(organization);
    } catch (err) {
      console.error(err.message);
    }
  });
 
  
  module.exports = router;