'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('projects',{
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
      client_id: {
        type:Sequelize.INTEGER
      },
      category_id: {
        type:Sequelize.INTEGER
      },
      activided: {
        type:Sequelize.INTEGER,
        defaultValue: 1
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('projects');
  }
};
