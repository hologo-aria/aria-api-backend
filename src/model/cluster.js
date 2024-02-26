const {DataTypes} = require("sequelize");
const sequelize = require("../database");

const Clusters = sequelize.define("Clusters", {
    clusterID : {
        type: DataTypes.INTEGER,
        allowNull : false,     
        primaryKey : true,
        autoIncrement:true
    },
    clustername : {
        type: DataTypes.STRING,
        allowNull : false,     
    },
    organization : {
        type:DataTypes.STRING,
        allowNull:false,
    },
    location : {
        type:DataTypes.STRING,
        allowNull:false, 
    },
    cluster_owner_Type :{
        type:DataTypes.STRING,
        allowNull:false,
    },
    cluster_owner_id :{
        type:DataTypes.STRING,
        allowNull:false,
    },
    no_of_devices :{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0
    },
    activeStatus :{
        type:DataTypes.BOOLEAN,
        allowNull:false,
    }
   
})


module.exports = Clusters;