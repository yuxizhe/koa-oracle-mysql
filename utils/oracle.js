const configs = require("../configs");
const config = configs.oracle;
const oracledb = require("oracledb");

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

oracledb.createPool({
  user: config.USER,
  password: config.PASSWORD,
  connectString: config.CONNECT_STRING,
});

console.log("Connection pool started");

let query = function (sql, values) {
  return new Promise(async (resolve, reject) => {
    try {
      const connection = await oracledb.getConnection();
      const result = await connection.execute(sql, values);
      resolve(result.rows);
    } catch (error) {
      reject(error);
    }
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

  return {
    query,
    createTable,
    findDataById,
  };
};
