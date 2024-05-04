const db = require("../database/dbConnect");
const jwt = require("jsonwebtoken");

module.exports = {
  isManager: async (account_ID) => {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM manager WHERE manager.ID = ?`;
      let params = [account_ID];
      db.query(sql, params, (error, result) => {
        if (error) reject(error);
        if (result.length) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  },
  getUser: async (account_name) => {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM account WHERE account_name = ?`;
      let params = [account_name];
      db.query(sql, params, (error, result) => {
        if (error) reject(error);
        if (result.length) {
          resolve(result[0]);
        } else {
          resolve(false);
        }
      });
    });
  },
  register: async (account_ID, account_name, password, employee_ID) => {
    return new Promise((resolve, reject) => {
      const check_manager_sql = `SELECT * FROM manager WHERE manager.ID = ?`;
      const check_params = [account_ID];
      db.query(check_manager_sql, check_params, (err, result) => {
        if (err) reject(err);
        if (result.length == 0) resolve(false);
        let sql = "CALL add_account(?, ?, ?)";
        let params = [account_name, password, employee_ID];
        db.query(sql, params, (error, result) => {
          if (error) reject(error);
          resolve(true);
        });
      });
    });
  },
};
