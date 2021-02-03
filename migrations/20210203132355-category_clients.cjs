'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('category_clients',{
      id: {
        type:Sequelize.INTEGER,    
        autoIncrement:true,
        primaryKey:true
      },
      client_id: {
        type:Sequelize.INTEGER
      },
      category_id: {
        type:Sequelize.INTEGER
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('category_clients');
  }
};
