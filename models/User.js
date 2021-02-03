'use strict'

let myFunction =  (sequelize,DataTypes) => {
  let User = sequelize.define('users',{
    id: {
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
    },
    password: {
      type:DataTypes.STRING,
      allowNull:true
    },    
    // model_id: {
    //   type: DataTypes.INTEGER,
    // },
    // role_id: {
    //   type: DataTypes.INTEGER,
    // }
  })
  
  // User.associate = (models) => {    
  //   User.hasMany(models.user_permissions,{                    
  //     foreignKey: 'user_id'
  //   })

  //   User.hasMany(models.role_permissions,{                    
  //     foreignKey: 'role_id'
  //   })

  //   User.belongsTo(models.roles,{                    
  //     foreignKey: 'role_id'
  //   })
  // }
  

  return User
};

let name = "users"
export { myFunction, name };