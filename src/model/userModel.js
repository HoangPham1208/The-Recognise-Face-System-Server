const db = require("../database/dbConnect");

const updateInfo = async (account_ID, password, phone_num, address, avatar) => {
  return new Promise((resolve, reject) => {
    const sql = `CALL update_info(?,?,?,?,?)`;
    const params = [account_ID, password, phone_num, address, avatar];
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

// pending - wait for DB
const getAttendanceTrack = async (user_id, date_time) => {
  return new Promise((resolve, reject) => {
    const sql = `
    SELECT 'name','position','date','time','status','type','
    FROM accoun WHERE ID = ?`;
    const params = [account_ID];
    db.query(sql, params, (err, result) => {
      if (err) reject(err);
      console.log(result);
      if (result.length) {
        resolve(result[0]);
      } else {
        resolve(false);
      }
    });
  });
};

// pending - wait for DB
const getEmployeeDetails = async (user_id) => {
  return new Promise((resolve, reject) => {
    const sql = `
    SELECT 'name','position','date','time','status','type','
    FROM accoun WHERE ID = ?`;
    const params = [account_ID];
    db.query(sql, params, (err, result) => {
      if (err) reject(err);
      console.log(result);
      if (result.length) {
        resolve(result[0]);
      } else {
        resolve(false);
      }
    });
  });
};
// pending - wait for DB
const getAnnouncement = async (user_id) => {
  return new Promise((resolve, reject) => {
    const sql = `
    SELECT 'name','position','date','time','status','type','
    FROM accoun WHERE ID = ?`;
    const params = [account_ID];
    db.query(sql, params, (err, result) => {
      if (err) reject(err);
      console.log(result);
      if (result.length) {
        resolve(result[0]);
      } else {
        resolve(false);
      }
    });
  });
};
module.exports = { updateInfo, getUser, getAttendanceTrack, getEmployeeDetails, getAnnouncement };
