const db = require("../database/dbConnect");
const path = require("path");

const updateFaceModel = async (user_id) => {
  return new Promise((resolve, reject) => {
    const sql = `
        UPDATE account
        SET face_model = ?
        WHERE ID = ?`;
    const dir = process.env.IMAGES_PATH_MODEL + user_id;
    const params = [dir, user_id];
    db.query(sql, params, (err, result) => {
      if (err) reject(err);
      else resolve(true);
    });
  });
};

const getFaceModelList = async (user_id) => {
  return new Promise((resolve, reject) => {
    const sql = `
        SELECT face_model FROM account
        WHERE ID = ?`;
    const params = [user_id];
    db.query(sql, params, (err, result) => {
      if (err) reject(err);
      if (result.length) resolve(result[0]);
      else resolve(false);
    });
  });
};

const updateEmployee = async (
  employee_ID,
  name,
  email,
  phone,
  working_days,
  position
) => {
  return new Promise((resolve, reject) => {
    let sql_1 = `
      UPDATE employee
      SET position = ?, working_days = ?
      WHERE ID = ?
      `;
    let params_1 = [position, working_days, employee_ID];
    db.query(sql_1, params_1, (err, result) => {
      if (err) reject(err);
      let sql_2 = `
        UPDATE account
        SET name = ?, email = ?, phone_num = ?
        WHERE ID = ?
        `;
      let params_2 = [name, email, phone, employee_ID];
      db.query(sql_2, params_2, (err, result) => {
        if (err) reject(err);
        let sql_3;
        if (position == "manager") sql_3 = `INSERT INTO manager VALUES (?)`;
        else sql_3 = `DELETE FROM manager WHERE manager.ID = ?`;

        let params_3 = [employee_ID];
        db.query(sql_3, params_3, (err, result) => {
          if (err) reject(err);
          else resolve(true);
        });
      });
    });
  });
};

const getForm = async (account_ID) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * from form`;
    const params = [];
    db.query(sql, params, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

const respondForm = async (
  form_ID,
  account_ID,
  status,
  date_time,
  description
) => {
  return new Promise((resolve, reject) => {
    const sql = `CALL respond_form(?,?,?,?,?)`;
    const params = [form_ID, account_ID, status, date_time, description];
    db.query(sql, params, (err, result) => {
      if (err) reject(err);
      else resolve(true);
    });
  });
};

const getEmployeeData = async (employee_ID) => {
  return new Promise((resolve, reject) => {
    let sql = `
    SELECT e.ID, e.position, e.working_days, e.address, e.email, e.name, e.phone_num, a.status 
    FROM employee as e LEFT OUTER join account as a 
    ON e.ID = a.ID`;
    if (employee_ID) sql += ` WHERE e.ID = ?`;
    const params = [employee_ID];
    db.query(sql, params, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};
const getAllAttendanceTrack = async (employee_ID, Track_ID) => {
  return new Promise((resolve, reject) => {
    let sql;
    let params = [];
    if (!employee_ID && !Track_ID)
      sql = `
    SELECT i.ID AS Track_ID, i.employee_ID, i.device_ID, e.name, e.position, i.date, i.time, i.status, i.value, i.type 
    FROM iot_data AS i, employee AS e 
    WHERE i.employee_ID = e.ID;`;
    else if (employee_ID && !Track_ID) {
      sql = `
    SELECT i.ID AS Track_ID, i.employee_ID, i.device_ID, e.name, e.position, i.date, i.time, i.status, i.value, i.type 
    FROM iot_data AS i, employee AS e 
    WHERE i.employee_ID = e.ID and i.employee_ID = ?;`;
      params = [employee_ID];
    }
    else{
      sql = `
      SELECT i.ID AS Track_ID, i.employee_ID, i.device_ID, e.name, e.position, i.date, i.time, i.status, i.value, i.type 
      FROM iot_data AS i, employee AS e 
      WHERE i.employee_ID = e.ID and i.ID = ?;`;
        params = [Track_ID];
    }
    db.query(sql, params, (err, result) => {
      if (err) reject(err);
      if (result.length) resolve(result);
      else resolve(false);
    });
  });
};

module.exports = {
  updateFaceModel,
  getFaceModelList,
  updateEmployee,
  getForm,
  respondForm,
  getEmployeeData,
  getAllAttendanceTrack,
};
