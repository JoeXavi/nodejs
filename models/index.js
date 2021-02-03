'use strict';

import fs from 'fs';
import { fileURLToPath } from 'url';
import * as path from 'path';
import sq from 'sequelize';
let Sequelize = sq.Sequelize;
const __filename = fileURLToPath(import.meta.url);
const basename = path.basename(__filename);
const __dirname = path.resolve();

const db = {};
import { config } from '../config/index.js';

const Op = Sequelize.Op
const DataTypes = Sequelize.DataTypes

//console.log(config)
const sequelize = new Sequelize({
  database: config.dbName,
  username: config.dbUser,
  password: config.dbPassword,
  host: config.dbHost,
  port:config.dbPort,
  dialect:'postgres',
  define: {
    timestamps: false,
    underscored: true
  },
  logging: (config.dbLogging === 'debug' ? true : false),
  //operatorsAliases: operatorsAliases
})

sequelize.authenticate()
.then(() => {    
  console.log('Database is connected')
})
.catch(err => {
  console.log(`Database conection error => ${err}`)
})

fs
  .readdirSync(`${__dirname}/models`)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(async file => {
    // console.log("file", file)
    const pathModule = path.join(`${__dirname}/models`, file)
    const model = await import(pathModule);
    //console.log(model)
    db[model.name] = model.myFunction(sequelize, DataTypes);
  
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);    
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;