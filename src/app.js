const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const app = express();

const clientReg = require("./api/clientReg");
const getClient = require("./api/getClient");
const clusterReg = require("./api/clusterReg");
const getCluster = require("./api/getCluster");
const deviceReg = require("./api/deviceReg");
const getDevice = require("./api/getDevice");
const adminReg = require("./api/adminReg");
const getAdmin = require("./api/getAdmin");

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json())



app.use("/api/v1/client", clientReg);
app.use("/api/v1/getclient" , getClient);
app.use("/api/v1/cluster", clusterReg);
app.use("/api/v1/getcluster", getCluster);
app.use("/api/v1/device", deviceReg);
app.use("/api/v1/getdevice",getDevice);
app.use("/api/v1/admin",adminReg);
app.use("/api/v1/getadmin",getAdmin);

module.exports = app;