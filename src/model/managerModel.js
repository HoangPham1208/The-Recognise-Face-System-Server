const db = require('../database/dbConnect')
const path = require('path')

const updateFaceModel = async (account_ID, user_id) => {
  return new Promise((resolve, reject) => {
    const check_manager_sql = `SELECT * from employee as e where e.ID = ? and e.position = 'manager'`
    const check_params = [account_ID]
    db.query(check_manager_sql, check_params, (err, result) => {
      if (err) reject(err)
      if (result.length == 0) resolve(false)
      db.query(check_manager_sql, check_params, (err, result) => {
        if (err) reject(err)
        if (result.length == 0) resolve(false)
        const sql = `
        UPDATE account
        SET face_model = ?
        WHERE ID = ?`
        const dir = path.join(process.env.IMAGES_PATH, user_id)
        const params = [dir, user_id]
        db.query(sql, params, (err, result) => {
          if (err) reject(err)
          else resolve(true)
        })
      })
    })
  })
}

const updateEmployee = async (
  account_ID,
  employee_ID,
  name,
  email,
  phone,
  working_days,
  position
) => {
  return new Promise((resolve, reject) => {
    const check_manager_sql = `SELECT * from employee as e where e.ID = ? and e.position = 'manager'`
    const check_params = [account_ID]
    db.query(check_manager_sql, check_params, (err, result) => {
      if (err) reject(err)
      if (result.length == 0) resolve(false)
      let sql_1 = `
      UPDATE employee
      SET position = ?, working_days = ?
      WHERE ID = ?
      `
      let params_1 = [position, working_days, employee_ID]
      db.query(sql_1, params_1, (err, result) => {
        if (err) reject(err)
        let sql_2 = `
        UPDATE account
        SET name = ?, email = ?, phone_num = ?
        WHERE ID = ?
        `
        let params_2 = [name, email, phone, employee_ID]
        db.query(sql_2, params_2, (err, result) => {
          if (err) reject(err)
          else resolve(true)
        })
      })
    })
  })
}

const getForm = async (account_ID) => {
  return new Promise((resolve, reject) => {
    const check_manager_sql = `SELECT * from employee as e where e.ID = ? and e.position = 'manager'`
    const check_params = [account_ID]
    db.query(check_manager_sql, check_params, (err, result) => {
      if (err) reject(err)
      if (result.length == 0) resolve(false)
      const sql = `SELECT * from form`
      const params = []
      db.query(sql, params, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  })
}

const respondForm = async (
  account_ID,
  date_time,
  description,
  status,
  form_id
) => {
  return new Promise((resolve, reject) => {
    const check_manager_sql = `SELECT * from employee as e where e.ID = ? and e.position = 'manager'`
    const check_params = [account_ID]
    db.query(check_manager_sql, check_params, (err, result) => {
      if (err) reject(err)
      if (result.length == 0) resolve(false)
      const sql = `SELECT * from announcement`
      const params = [account_ID, date_time, description, status, form_id]
      db.query(sql, params, (err, result) => {
        if (err) reject(err)
        else resolve(true)
      })
    })
  })
}

module.exports = {
  updateFaceModel,
  updateEmployee,
  getForm,
  respondForm,
}
