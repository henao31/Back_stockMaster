const pg = require("pg");
const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "db_inventario",
  password: "0",
  port: 5432,
});

module.exports = pool;
