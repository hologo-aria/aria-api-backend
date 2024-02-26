// Devices --> ( Mac_Address , Device_ID , Status , Logs , Admin_ID, Clusters_ID , Device_Owner_Type , Device_Owner_ID

const {DataTypes, Sequelize} = require("sequelize");
const sequelize = require("../database");

const Devices = sequelize.define("Devices",{
    deviceID : {
        type: DataTypes.INTEGER,
        allowNull : false,     
        primaryKey : true,
        autoIncrement:true
    },
    devicename:{
        type: DataTypes.STRING,
        allowNull : false,     
    },
    clustername : {
        type: DataTypes.STRING,
        allowNull : false,     
    },
    clusterActiveStatus : {
        type:DataTypes.BOOLEAN,
        allowNull:false,
    },
    mac_address :{
        type:DataTypes.STRING,
        allowNull:false,
    },
    organization : {
        type:DataTypes.STRING,
        allowNull:false,
    },
    location : {
        type:DataTypes.STRING,
        allowNull:false, 
    },
    deivce_owner_Type :{
        type:DataTypes.STRING,
        allowNull:false,
    },
    deivce_owner_id :{
        type:DataTypes.STRING,
        allowNull:false,
    },
    activeStatus :{
        type:DataTypes.BOOLEAN,
        allowNull:false,
    }
})


module.exports = Devices;