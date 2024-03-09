const {DataTypes} = require("sequelize");
const sequelize = require("../database");
const Admins = require("./admin")


const Clients = sequelize.define("Clients", {
    ID:{
        type: DataTypes.INTEGER,
        allowNull : false,     
        primaryKey : true,
        autoIncrement: true
    },
    
    clientID : {
        type: DataTypes.STRING,
        allowNull : true,     
        defaultValue:"CLI"
    },

    adminID :{
        type: DataTypes.STRING,
        allowNull : false,       
        
    }
    ,
    firstname :{
        type:DataTypes.STRING,
        allowNull:false,
    },
    lastname :{
        type:DataTypes.STRING,
        allowNull:false,
    },
    organization : {
        type:DataTypes.STRING,
        allowNull:false,
    },
    mobile :{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email :{
        type:DataTypes.STRING,
        allowNull:false,
    },
    country :{
        type:DataTypes.STRING,
        allowNull:false,
    },
    addressLine :{
        type:DataTypes.STRING,
        allowNull:false,
    },
    addressLineTwo :{
        type:DataTypes.STRING,
        allowNull:true,
    },
    timeZone :{
        type:DataTypes.STRING,
        allowNull:false,
    },
    zipcode :{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    username :{
        type:DataTypes.STRING,
        allowNull:false,
    },
    password :{
        type:DataTypes.STRING,
        allowNull:false,
    },
    accessLevel : {
        type:DataTypes.STRING,
        allowNull:false,
    },
    activeStatus :{
        type:DataTypes.BOOLEAN,
        allowNull:false,
    }
},{
    hooks: {
        // Before creating a new admin, add the prefix to the adminID
        afterCreate: async (client, options) => {
            const prefix = 'CLI_';
            const paddedId = client.ID.toString().padStart(4, '0'); // Ensure ID is 4 digits
            client.clientID = prefix + paddedId;
            await client.update({clientID : client.clientID })
        }
    }
})


module.exports = Clients;