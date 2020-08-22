const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  development: {
    username: root,
    password: sqlpassword,
    database: passport_demo,
    host: 127.0.0.1,
    port: process.env.PORT,
    dialect: mysql
  },
  test: {
    username: root,
    password: null,
    database: database_test,
    host: 127.0.0.1,
    port: process.env.PORT,
    dialect: mysql
  },
  production: {
    use_env_variable: JAWSDB_URL,
    dialect: mysql
  }
}
