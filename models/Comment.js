const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Comment extends Model{}

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },

    content:{
        type: DataTypes.STRING,
        allowNull: false,  
    },
    date_create:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue:()=>DataTypes.NOW
    },
    user_id:{
        type:DataTypes.INTEGER,
        references:{
            model:'user',
            key:'id'
        }
    }
},{
    sequelize,
    modelName:'post'
})

module.exports=Comment