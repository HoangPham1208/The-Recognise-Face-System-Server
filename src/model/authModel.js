const db = require("../database/dbConnect");
const jwt = require("jsonwebtoken");

module.exports = {
  login: async (account_name, password) => {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM account WHERE account_name = ? and password = ?`;
      let params = [account_name, password];
      db.query(sql, params, (error, result) => {
        if (error) reject(error);
        if (result.length) {
          const id = result[0].ID;
          const token = jwt.sign({ id }, process.env.SECRET_TOKEN, {
            expiresIn: "24h",
          });
          resolve(token);
        } else resolve(false);
      });
    });
  },
};
