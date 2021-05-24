const mysqldb = require("../utils/mysql")("mpaas_cms");
const oracledb = require("../utils/oracle")("EMPLOYEES");
const jsonWriter = require("../utils/jsonwriter");

module.exports = {
  get: async (ctx) => {
    const { id, db } = ctx.request.query;
    let res = {};
    if (db === "mysql") {
      [res] = await mysqldb.findDataById(id);
    } else {
      [res] = await oracledb.findDataById(id);
    }
    jsonWriter(ctx, res);
  },
};
