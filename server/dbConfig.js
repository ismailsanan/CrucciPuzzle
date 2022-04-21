//which enviroment to use
const dbEngine = process.env.DB_ENVIROMENT || "development";
const config = require("./knexfile")[dbEngine]; //connection db

module.exports = require("knex")(config)

