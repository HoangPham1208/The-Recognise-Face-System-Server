const db = require("../database/dbConnect");

const updateUser = async (account_ID, phone_num, address, email, avatar) => {
  return new Promise((resolve, reject) => {
    const sql = `CALL update_info(?,?,?,?,?)`;
    const params = [account_ID, phone_num, address, email, avatar];
    db.query(sql, params, (err, result) => {
      if (err) reject(err);
      resolve(true);
    });
  });
};

const changePassword = async (account_ID, hash_password) => {
  return new Promise((resolve, reject) => {
    const sql = `
    UPDATE account
    SET password = ?
    WHERE ID = ?`;
    const params = [account_ID, hash_password];
    db.query(sql, params, (err, result) => {
      if (err) reject(err);
      resolve(true);
    });
  });
};

const getUser = async (account_name) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM account WHERE account_name = ?`;
    const params = [account_name];
    db.query(sql, params, (err, result) => {
      if (err) reject(err);
      if (result.length) {
        resolve(result[0]);
      } else {
        resolve(false);
      }
    });
  });
};
const createOtp = async (account_ID) => {
  return new Promise((resolve, reject) => {
    const sql = `CALL create_OTP(?)`;
    const params = [account_ID];
    db.query(sql, params, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};
const deleteOtp = async (account_ID) => {
  return new Promise((resolve, reject) => {
    const sql = `CALL delete_OTP(?)`;
    const params = [account_ID];
    db.query(sql, params, (err, result) => {
      if (err) reject(err);

      resolve(true);
    });
  });
};
const getOtp = async (account_ID) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT code FROM OTP WHERE account_ID = ?`;
    const params = [account_ID];
    db.query(sql, params, (err, result) => {
      if (err) reject(err);
      if (result.length) {
        resolve(result[0]);
      } else {
        resolve(false);
      }
    });
  });
};

// PENDING model
const getAttendanceTrack = async (account_ID) => {
  return new Promise((resolve, reject) => {
    const sql = `
    SELECT e.position, t.status as 'Status of Date', idata.date, idata.time, idata.value, idata.type, idev.name, idev.location, idev.role FROM employee as e, tracking_work_days as t, iot_data as idata, iot_device as idev
    WHERE e.ID = t.employee_ID and t.employee_ID = idata.employee_ID and idata.device_ID = idev.ID and e.ID = ?
    `;
    const params = [account_ID];
    db.query(sql, params, (err, result) => {
      if (err) reject(err);
      if (result.length) {
        resolve(result);
      } else {
        resolve(false);
      }
    });
  });
};

const getEmployeeDetails = async (account_ID) => {
  return new Promise((resolve, reject) => {
    const sql = `
    SELECT avatar,name,phone_num,address, position, working_days from account, employee
    where account.ID = employee.ID and account.id = ?
    `;
    const params = [account_ID];
    db.query(sql, params, (err, result) => {
      if (err) reject(err);
      if (result.length) {
        resolve(result[0]);
      } else {
        resolve(false);
      }
    });
  });
};

const sendForm = async (account_ID, date_time, description) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * from announcement`;
    const params = [account_ID, date_time, description];
    db.query(sql, params, (err, result) => {
      if (err) reject(err);
      else resolve(true);
    });
  });
};

const getForm = async (account_ID) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * from form as f, request as r where f.form_ID = request.form_ID and request.staff_ID = ?`;
    const params = [account_ID];
    db.query(sql, params, (err, result) => {
      if (err) reject(err);
      if (result.length) resolve(true);
      else resolve(false);
    });
  });
};
const getNotification = async (account_ID) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * from announcement as a, has_announcment as h where a.ID = h.announcement_ID and h.employee_ID = ? `;
    const params = [account_ID];
    db.query(sql, params, (err, result) => {
      if (err) reject(err);
      if (result.length) resolve(result);
      else resolve(false);
    });
  });
};

module.exports = {
  updateUser,
  changePassword,
  getUser,
  getOtp,
  deleteOtp,
  createOtp,
  getAttendanceTrack,
  getEmployeeDetails,
  sendForm,
  getForm,
  getNotification
};
