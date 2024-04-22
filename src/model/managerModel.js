const db = require("../database/dbConnect");

const getForm = async (account_ID) => {
  return new Promise((resolve, reject) => {
    const check_manager_sql = `SELECT * from employee as e where e.ID = ? and e.position = 'manager'`;
    const check_params = [account_ID];
    db.query(check_manager_sql, check_params, (err, result) => {
      if (err) reject(err);
      if (result.length == 0) resolve(false);
    });
    const sql = `SELECT * from form`;
    const params = [];
    db.query(sql, params, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

const respondForm = async (
  account_ID,
  date_time,
  description,
  status,
  form_id
) => {
  return new Promise((resolve, reject) => {
    const check_manager_sql = `SELECT * from employee as e where e.ID = ? and e.position = 'manager'`;
    const check_params = [account_ID];
    db.query(check_manager_sql, check_params, (err, result) => {
      if (err) reject(err);
      if (result.length == 0) resolve(false);
    });
    const sql = `SELECT * from announcement`;
    const params = [account_ID, date_time, description, status, form_id];
    db.query(sql, params, (err, result) => {
      if (err) reject(err);
      else resolve(true);
    });
  });
};

module.exports = {
  getForm,
  respondForm,
};
