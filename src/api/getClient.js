const express = require("express");
const router = express.Router();
const db = require("../database");
const Clients = require("../model/clients");
// const DealersLogin = require("../model/dealersLogin");

router.get("/", async (req, res) => {
  try {
    const clients = await Clients.findAll();
    res.status(200).json(clients);
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/:clientID", async (req, res) => {
  try {
      const clientID = req.params.clientID;
      const clients = await Clients.findAll({ where: { clientID } });
     res.status(200).json(clients);
  } catch (err) {
      console.error(err.message);
  }
});

router.put("/:clientID", async (req, res) => {
  try {
    const client = await Clients.findByPk(req.params.clientID);
    if (!client) {
      res.status(404).json({ message: "Client not found" });
      return;
    }
    // Update the client data
    await client.update(req.body);
    // Fetch the updated client data
    const updatedClient = await Clients.findByPk(req.params.clientID);
    res.status(200).json(updatedClient);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.delete("/:clientID", async (req, res) => {
  try {
    const count = await Clients.destroy({
      where: { clientID: req.params.clientID }
    });

    if (count === 0) {
      // No records deleted
      res.status(404).json({ message: "No client found with the specified ID" });
      return;
    }

    // Records deleted successfully
    res.status(200).json({ count: count });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
});




// router.put("/:id", async (req, res) => {
//   try {
//     const user = await Dealers.findByPk(req.params.id);

//     if (!user) {
//       res.status(400);
//       throw new Error("User not found");
//     }

//     const updatedUser = await user.set(req.body);

//     res.status(200).json(updatedUser);
//   } catch (err) {
//     console.error(err.message);
//   }
// });
module.exports = router;