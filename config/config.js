// For security, create a ".env" file in the project folder using the template in the existing ".env.sample" file,
// inputting all the necessary parameters. ".gitignore" will ensure that these details are never pushed up to GitHub.
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.PORT,
    dialect: process.env.DB_MYSQL
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.PORT,
    dialect: process.env.DB_MYSQL
  },
  production: {
    useEnvVariable: "JAWSDB_URL",
    dialect: "mysql"
  }
};
