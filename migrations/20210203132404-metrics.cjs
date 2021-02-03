'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('metrics',{
      id: {
        type:Sequelize.INTEGER,    
        autoIncrement:true,
        primaryKey:true
      },
      name: {
        type:Sequelize.STRING,
        allowNull:false
      },
      code: {
        type:Sequelize.TEXT
      },
      project_id: {
        type:Sequelize.INTEGER
      },
      activided: {
        type:Sequelize.INTEGER,
        defaultValue: 1
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('metrics');
  }
};
