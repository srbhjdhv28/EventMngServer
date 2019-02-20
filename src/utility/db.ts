
const Sequelize = require('sequelize');

// Or you can simply use a connection uri
const sequelize = new Sequelize('mysql://b871d25f0d99c4:543189c3@us-cdbr-iron-east-03.cleardb.net/heroku_f2ca4e2afb9f6c6?reconnect=true');
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err: any) => {
    console.error('Unable to connect to the database:', err);
  });
  
export default sequelize;