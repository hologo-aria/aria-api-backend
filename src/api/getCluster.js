const express = require("express");
const router = express.Router();
const db = require("../database");
const Clusters = require("../model/cluster");




router.get("/", async (req, res) => {
    try {
      const clusters = await Clusters.findAll();
      res.status(200).json(clusters);
    } catch (err) {
      console.error(err.message);
    }
  });


  
  

  router.get("/:clusterID", async (req, res) => {
    try {
        const clusterID = req.params.clusterID;
        const clusters = await Clusters.findAll({ where: { clusterID } });
       res.status(200).json(clusters);
    } catch (err) {
        console.error(err.message);
    }
  });

  router.put("/:clusterID", async (req, res) => {
    try {
      const clusters = await Clusters.findByPk(req.params.clusterID);
      if (!clusters) {
        res.status(404).json({ message: "clusters not found" });
        return;
      }
      // Update the clusters data
      await clusters.update(req.body);
      // Fetch the updated clusters data
      const updatedCluster = await Clusters.findByPk(req.params.clusterID);
      res.status(200).json(updatedCluster);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  
  router.delete("/:clusterID", async (req, res) => {
    try {
      const count = await Clusters.destroy({
        where: { clusterID: req.params.clusterID }
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


  router.get("/owner/:organization", async (req, res) => {
    try {
        const organization = req.params.organization;
        const clusters = await Clusters.findAll({ attributes:["clustername"] , where: { organization }});
       res.status(200).json(clusters);
    } catch (err) {
        console.error(err.message);
    }
  });

  router.get("/dash/:organization", async (req, res) => {
    try {
        const organization = req.params.organization;
        const clusters = await Clusters.findAll({  where: { organization }});
       res.status(200).json(clusters);
    } catch (err) {
        console.error(err.message);
    }
  });




module.exports = router;