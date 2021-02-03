'use strict';

const bcrypt = require( 'bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hash = await bcrypt.hash('010203', 10);
    return Promise.all([
      queryInterface.bulkInsert('users', [{
        id:1,
        name: 'Alejandro Cepeda',            
        email: 'alejandro.cepeda@tars.dev',
        password:hash,       
      }], {}),
      queryInterface.bulkInsert('users', [{
        id:2,
        name: 'Alejandro Cepeda',            
        email: 'jose.saldana@tars.dev',
        password:hash,        
      }], {}),
      queryInterface.bulkInsert('users', [{
        id:3,
        name: 'Alejandro Cepeda',            
        email: 'camilo.narvaez@tars.dev',
        password:hash,        
      }], {})
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
