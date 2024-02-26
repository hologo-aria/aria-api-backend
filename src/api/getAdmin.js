const express = require("express");
const router = express.Router();
const db = require("../database");
const Admins = require("../model/admin");
// const DealersLogin = require("../model/dealersLogin");

router.get("/", async (req, res) => {
  try {
    const admins = await Admins.findAll();
    res.status(200).json(admins);
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/:adminID", async (req, res) => {
  try {
      const adminID = req.params.adminID;
      const admins = await Admins.findAll({ where: { adminID } });
     res.status(200).json(admins);
  } catch (err) {
      console.error(err.message);
  }
});

router.put("/:adminID", async (req, res) => {
  try {
    const admin = await Admins.findByPk(req.params.adminID);
    if (!admin) {
      res.status(404).json({ message: "admin not found" });
      return;
    }
    // Update the admin data
    await admin.update(req.body);
    // Fetch the updated admin data
    const updatedadmin = await Admins.findByPk(req.params.adminID);
    res.status(200).json(updatedadmin);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.delete("/:adminID", async (req, res) => {
  try {
    const count = await Admins.destroy({
      where: { adminID: req.params.adminID }
    });

    if (count === 0) {
      // No records deleted
      res.status(404).json({ message: "No admin found with the specified ID" });
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