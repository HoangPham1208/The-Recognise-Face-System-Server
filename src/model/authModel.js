const db = require("../database/dbConnect");

module.exports = {
  login: async (username, password) => {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM user WHERE userName = ? and passWord = ?`;
      let params = [username, password];
      db.query(sql, params, (error, result) => {
        if (error) reject(error)
        if (result.length) resolve(true)
        else resolve(false)
      });
    });
  },
};
