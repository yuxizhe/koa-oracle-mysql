const mysqldb = require("../utils/mysql")("mpaas_cms");
const oracledb = require("../utils/oracle")("EMPLOYEES");

module.exports = {
  get: async (id, db) => {
    let res = {};
    if (db === "mysql") {
      [res] = await mysqldb.findDataById(id);
    } else {
      [res] = await oracledb.findDataById(id);
    }
    return res;
  },
};
