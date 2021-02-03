'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('images',{
      id: {
        type:Sequelize.INTEGER,    
        autoIncrement:true,
        primaryKey:true
      },
      filename: {
        type:Sequelize.STRING,
        allowNull:false
      },
      model: {
        type:Sequelize.STRING,
        allowNull:false
      },
      model_id: {
        type:Sequelize.INTEGER,
        allowNull:false
      },
      type: {
        type:Sequelize.STRING
      },
      activided: {
        type:Sequelize.INTEGER,
        defaultValue: 1
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('images');
  }
};
