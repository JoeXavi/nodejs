'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('clients',{
      id: {
        type:Sequelize.INTEGER,    
        autoIncrement:true,
        primaryKey:true
      },
      name: {
        type:Sequelize.STRING,
        allowNull:false
      },
      description: {
        type:Sequelize.TEXT
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
