const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME || null,
  process.env.DATABASE_PASSWORD || null,
  {
    dialect: 'postgres',
    host: process.env.DATABASE_HOST,
  }
);

const models = {
  User: sequelize.import('./user'),
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

module.exports = {
  models,
  sequelize,
};
