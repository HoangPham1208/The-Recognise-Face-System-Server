const db = require('../database/dbConnect')
const jwt = require('jsonwebtoken')

module.exports = {
  getUser: async (account_name) => {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM account WHERE account_name = ?`
      let params = [account_name]
      db.query(sql, params, (error, result) => {
        if (error) reject(error)
        if (result.length) {
          resolve(result[0])
        } else {
          resolve(false)
        }
      })
    })
  },
  register: async (account_name, password) => {
    return new Promise((resolve, reject) => {
      let sql = 'CALL add_staff(?, ?)'
      let params = [account_name, password]
      db.query(sql, params, (error, result) => {
        if (error) reject(error)
        resolve(true)
      })
    })
  },
}
