const express = require("express");
const Clusters = require("../model/cluster");

const router = express.Router();

router.post("/", async (req, res) => {
  const {
    clustername,
    organization,
    location,
    activeStatus,
    cluster_owner_Type,
    cluster_owner_id,
  } = req.body;

  const noOfDevices = 0;

  const alreadyExistsCluster = await Clusters.findOne({
    where: { clustername },
  }).catch((err) => {
    console.log("Error: ", err);
  });

  if (alreadyExistsCluster) {
    return res
      .status(409)
      .json({ message: "Client with username already exists!" });
  } else {
    const newCluster = new Clusters({
      clustername,
      organization,
      location,
      activeStatus,
      cluster_owner_Type,
      cluster_owner_id,
      noOfDevices,
    });
    const saveCluster = await newCluster.save().catch((err) => {
      console.log("Error: ", err);
      res.status(500).json({ error: "Cannot register Client at the moment!" });
    });

    if (saveCluster) res.json({ message: "Thanks for registering" });
  }
});

module.exports = router;
