const { check_in } = require("../controller/attendController");
const db = require("../database/dbConnect");
const time_config = require("../config/dbconfig.json")

module.exports = {
  check_in: async (account_name, password) => {
    return new Promise((resolve, reject) => {
      let sql = ` INSERT INTO account`;
      let params = [account_name, password];
      db.query(sql, params, (error, result) => {
        if (error) reject(error);
        if (result.length) {
          resolve();
        } else resolve(false);
      });
    });
  },
};
