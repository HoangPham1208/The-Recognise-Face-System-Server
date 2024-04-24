const { check_in } = require("../controller/attendController");
const db = require("../database/dbConnect");
const time_config = require("../config/dbconfig.json");

module.exports = {
  get_all: async () => {
    return new Promise((resolve, reject) => {
      let sql = `SELECT ID, account_name, name from account`;
      let params = [];
      db.query(sql, params, (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    });
  },
  check_in: async (account_ID, device_ID, date, time, value, type) => {
    return new Promise((resolve, reject) => {
      let sql = ` INSERT INTO account`;
      let params = [account_ID, device_ID, date, time, value, type];
      db.query(sql, params, (error, result) => {
        if (error) reject(error);
        if (result.length) {
          resolve(true);
        } else resolve(false);
      });
    });
  },
  check_out: async (account_ID, device_ID, date, time, value, type) => {
    return new Promise((resolve, reject) => {
      let sql = ` INSERT INTO account`;
      let params = [account_ID, device_ID, date, time, value, type];
      db.query(sql, params, (error, result) => {
        if (error) reject(error);
        if (result.length) {
          resolve(true);
        } else resolve(false);
      });
    });
  },
};
