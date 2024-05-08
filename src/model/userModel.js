const db = require("../database/dbConnect");

const updateAvatar = async (account_ID, avatar) => {
  return new Promise((resolve, reject) => {
    const sql = `CALL update_avatar(?,?)`;
    const params = [account_ID, avatar];
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
    const params = [hash_password, account_ID];
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
    SELECT idata.date, idata.time, idata.type, idata.value, idev.name, idev.location FROM iot_data as idata, iot_device as idev
    WHERE idata.device_ID = idev.ID and idata.employee_ID = ?
    ORDER BY idata.time
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
    SELECT avatar,name, email, phone_num,address, position, working_days, begin_at, end_at from account, employee
    where account.ID = employee.ID  and account.id = ?
    `;
    const params = [account_ID];
    db.query(sql, params, (err, result) => {
      if (err) reject(err);
      if (result.length) {
        const sql2 = `
        SELECT begin_at, end_at FROM working_time WHERE ID = ?
        `;
        const params2 = [account_ID];
        let part1 = result;
        db.query(sql2, params2, (err, result) => {
          if (err) reject(err);
          let part2 = result;
          part1[0]["shift"] = part2;
          const sql3 = `SELECT count(*) as number FROM tracking_work_days where status = "Absent" and employee_ID = ?`;
          const params3 = [account_ID];
          db.query(sql3, params3, (err, result) => {
            if (err) reject(err);
            let part3 = result;
            part1[0]["absent_days"] = part3[0]['number'];
            resolve(part1[0]);
          });
        });
      } else {
        resolve(false);
      }
    });
  });
};

const sendForm = async (account_ID, type, date_time, description) => {
  return new Promise((resolve, reject) => {
    const sql = `CALL send_form(?,?,?,?)`;
    const params = [account_ID, type, date_time, description];
    db.query(sql, params, (err, result) => {
      if (err) reject(err);
      else resolve(true);
    });
  });
};

const getForm = async (account_ID) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * from form as f, request as r where f.ID = r.form_ID and r.staff_ID = ?`;
    const params = [account_ID];
    db.query(sql, params, (err, result) => {
      if (err) reject(err);
      if (result.length) resolve(result);
      else resolve(false);
    });
  });
};
const getNotification = async (account_ID) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * from announcement as a, has_announcement as h where a.ID = h.announcement_ID and h.employee_ID = 1`;
    const params = [account_ID];
    db.query(sql, params, (err, result) => {
      if (err) reject(err);
      if (result.length) resolve(result);
      else resolve(false);
    });
  });
};

const getAvatar = async (account_ID) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT avatar FROM account WHERE account.ID = ?`;
    const params = [account_ID];
    db.query(sql, params, (err, result) => {
      if (err) reject(err);
      if (result.length) resolve(result[0].avatar);
      else resolve(false);
    });
  });
};

module.exports = {
  updateAvatar,
  changePassword,
  getUser,
  getOtp,
  deleteOtp,
  createOtp,
  getAttendanceTrack,
  getEmployeeDetails,
  sendForm,
  getForm,
  getNotification,
  getAvatar,
};
