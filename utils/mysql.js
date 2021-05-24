const configs = require("../configs");
const config = configs.mysql;
const mysql = require("mysql");

const pool = mysql.createPool({
  host: config.HOST,
  user: config.USERNAME,
  password: config.PASSWORD,
  database: config.DATABASE,
});

let query = function (sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        resolve(err);
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
          connection.release();
        });
      }
    });
  });
};

module.exports = (table) => {
  let createTable = function (sql) {
    return query(sql, []);
  };

  let findDataById = function (id) {
    let _sql = `SELECT * FROM  ${table} WHERE id = ${id}`;
    return query(_sql, []);
  };

  let findDataByPage = function (keys, start, end) {
    let _sql = "SELECT ?? FROM ??  LIMIT ? , ?";
    return query(_sql, [keys, table, start, end]);
  };

  let insertData = function (values) {
    let _sql = "INSERT INTO ?? SET ?";
    return query(_sql, [table, values]);
  };

  let updateData = function (values, id) {
    let _sql = "UPDATE ?? SET ? WHERE id = ?";
    return query(_sql, [table, values, id]);
  };

  let deleteDataById = function (id) {
    let _sql = "DELETE FROM ?? WHERE id = ?";
    return query(_sql, [table, id]);
  };

  let select = function (keys) {
    let _sql = "SELECT ?? FROM ?? ";
    return query(_sql, [keys, table]);
  };

  let count = function () {
    let _sql = "SELECT COUNT(*) AS total_count FROM ?? ";
    return query(_sql, [table]);
  };

  return {
    query,
    createTable,
    findDataById,
    findDataByPage,
    deleteDataById,
    insertData,
    updateData,
    select,
    count,
  };
};
