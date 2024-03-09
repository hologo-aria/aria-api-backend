const express = require("express");
const router = express.Router();
const db = require("../database");
const Devices = require("../model/devices");
const Clusters = require("./../model/cluster")



router.get("/", async (req, res) => {
    try {
      const devices = await Devices.findAll();
      res.status(200).json(devices);
    } catch (err) {
      console.error(err.devices);
    }
  });


router.get("/:deviceID", async (req, res) => {
  try {
      const deviceID = req.params.deviceID;
      const devices = await Devices.findAll({ where: { deviceID } });
      res.status(200).json(devices);
  } catch (err) {
      console.error(err.message);
  }
});


router.put("/:deviceID", async (req, res) => {
  try {
    const devices = await Devices.findByPk(req.params.deviceID);
    if (!devices) {
      res.status(404).json({ message: "devices not found" });
      return;
    }
    // Update the devices data
    await devices.update(req.body);
    // Fetch the updated devices data
    const updatedDevices = await Devices.findByPk(req.params.deviceID);
    res.status(200).json(updatedDevices);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

  
router.delete("/:clustername/:deviceID", async (req, res) => {
  try {
    const count = await Devices.destroy({
      where: { deviceID: req.params.deviceID }
    });

    const clusters = await Clusters.findOne({ where: { clustername: req.params.clustername } });
    if (clusters) {
      if(clusters.no_of_devices > 0) {
        clusters.no_of_devices = clusters.no_of_devices  - 1 ;
      }
      else{
        clusters.no_of_devices = 0;
      }
      await clusters.save();
    }

    if (count === 0) {
      // No records deleted
      res.status(404).json({ message: "No devices found with the specified ID" });
      return;
    }

    // Records deleted successfully
    res.status(200).json({ count: count });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/dash/:organization", async (req, res) => {
  try {
      const organization = req.params.organization;
      const devices = await Devices.findAll({ where: { organization }});
     res.status(200).json(devices);
  } catch (err) {
      console.error(err.message);
  }
});





module.exports = router;