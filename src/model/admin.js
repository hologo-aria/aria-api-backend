const {DataTypes} = require("sequelize");
const sequelize = require("../database");

const Admins = sequelize.define("Admins", {
    ID:{
        type: DataTypes.INTEGER,
        allowNull : false,     
        primaryKey : true,
        autoIncrement: true
    },
    
    adminID : {
        type: DataTypes.STRING,
        allowNull : true,     
        defaultValue:"ADM"
    },
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
    },
   
},
{
    hooks: {
        // Before validating a new admin, add the prefix and ensure the ID is four digits
        afterCreate: async (admin, options) => {
            const prefix = 'ADM_';
            // Ensure ID is populated
            const paddedId = admin.ID.toString().padStart(4, '0'); // Ensure ID is 4 digits
            admin.adminID = prefix + paddedId;
            await admin.update({adminID : admin.adminID })
        }

        
    },
    
}

)


module.exports = Admins;