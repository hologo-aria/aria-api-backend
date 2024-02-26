const express = require("express");
const Devices = require("../model/devices");
const Clusters = require("./../model/cluster")

const router = express.Router();

router.post("/", async (req, res) => {
  const {
    devicename,
    clustername,
    organization,
    mac_address,
    activeStatus,
    location,
    deivce_owner_Type,
    deivce_owner_id,
  } = req.body;

  const alreadyExistsCluster = await Devices.findOne({
    where: { devicename },
  }).catch((err) => {
    console.log("Error: ", err);
  });

  const clusters = await Clusters.findOne({ where: { clustername } });

  if (!clusters) {
    return res
      .status(404)
      .json({ message: "Cluster with the given name does not exist!" });
  }

  if (alreadyExistsCluster) {
    return res
      .status(409)
      .json({ message: "Client with username already exists!" });
  } else {
    const newDevice = new Devices({
        devicename,
        clustername,
        organization,
        clusterActiveStatus : clusters.activeStatus,
        mac_address,
        activeStatus,
        location,
        deivce_owner_Type,
        deivce_owner_id,
    });
    const saveCluster = await newDevice.save().catch((err) => {
      console.log("Error: ", err);
      res.status(500).json({ error: "Cannot register Client at the moment!" });
    });

    if (saveCluster) {
        res.json({ message: "Thanks for registering" });
       
        if (clusters) {
            clusters.no_of_devices = (clusters.no_of_devices || 0) + 1;
            await clusters.save();
          }
    } 
  }
});

module.exports = router;
