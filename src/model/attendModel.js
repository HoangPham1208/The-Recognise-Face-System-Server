const db = require("../database/dbConnect");

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
  check_in_out: async (account_ID, device_ID, date, time, value, type) => {
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
  checkFirstCheckIn: async (date, account_ID, value_shift) => {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * from iot_data WHERE date = ? and employee_ID = ? and type = ?`;
      let params = [date, account_ID, "first check in for " + value_shift];
      db.query(sql, params, (error, result) => {
        if (error) reject(error);
        if (result.length) {
          resolve(true);
        } else resolve(false);
      });
    });
  },
};
